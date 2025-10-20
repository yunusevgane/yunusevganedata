const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ADB komutlarını çalıştır
function runAdbCommand(command) {
    try {
        console.log(`Çalıştırılıyor: ${command}`);
        execSync(command, { encoding: 'utf8' });
        console.log('✅ Başarılı');
    } catch (error) {
        console.error('❌ Hata:', error.message);
        throw error;
    }
}

// ADB bağlantısını kontrol et
function checkAdbConnection() {
    try {
        console.log('📱 ADB bağlantısı kontrol ediliyor...');
        execSync('adb devices', { encoding: 'utf8' });
        console.log('✅ ADB bağlantısı başarılı');
        return true;
    } catch (error) {
        console.error('❌ ADB bağlantı hatası:', error.message);
        console.log('\n🔧 Çözüm önerileri:');
        console.log('1. USB Debugging açık mı kontrol edin');
        console.log('2. Cihazı USB ile bilgisayara bağlayın');
        console.log('3. "adb kill-server" ve "adb start-server" komutlarını deneyin');
        console.log('4. Cihazda "Bu bilgisayara güven" seçeneğini onaylayın');
        return false;
    }
}

// XML'i JSON'a çevir
function parseXmlToJson(xmlContent) {
    const buttons = [];
    const clickableElements = [];
    const texts = [];
    
    // XML'i parse et (basit regex ile)
    const buttonMatches = xmlContent.match(/<node[^>]*class="[^"]*[Bb]utton[^"]*"[^>]*>/g) || [];
    const clickableMatches = xmlContent.match(/<node[^>]*clickable="true"[^>]*>/g) || [];
    const textMatches = xmlContent.match(/<node[^>]*text="[^"]*"[^>]*>/g) || [];
    
    // Butonları parse et
    buttonMatches.forEach((match, index) => {
        const bounds = match.match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
        const text = match.match(/text="([^"]*)"/);
        const resourceId = match.match(/resource-id="([^"]*)"/);
        const className = match.match(/class="([^"]*)"/);
        
        if (bounds) {
            buttons.push({
                id: index + 1,
                type: 'button',
                text: text ? text[1] : '',
                resourceId: resourceId ? resourceId[1] : '',
                className: className ? className[1] : '',
                bounds: {
                    left: parseInt(bounds[1]),
                    top: parseInt(bounds[2]),
                    right: parseInt(bounds[3]),
                    bottom: parseInt(bounds[4])
                },
                center: {
                    x: Math.round((parseInt(bounds[1]) + parseInt(bounds[3])) / 2),
                    y: Math.round((parseInt(bounds[2]) + parseInt(bounds[4])) / 2)
                }
            });
        }
    });
    
    // Tıklanabilir elementleri parse et
    clickableMatches.forEach((match, index) => {
        const bounds = match.match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
        const text = match.match(/text="([^"]*)"/);
        const resourceId = match.match(/resource-id="([^"]*)"/);
        const className = match.match(/class="([^"]*)"/);
        
        if (bounds) {
            clickableElements.push({
                id: index + 1,
                type: 'clickable',
                text: text ? text[1] : '',
                resourceId: resourceId ? resourceId[1] : '',
                className: className ? className[1] : '',
                bounds: {
                    left: parseInt(bounds[1]),
                    top: parseInt(bounds[2]),
                    right: parseInt(bounds[3]),
                    bottom: parseInt(bounds[4])
                },
                center: {
                    x: Math.round((parseInt(bounds[1]) + parseInt(bounds[3])) / 2),
                    y: Math.round((parseInt(bounds[2]) + parseInt(bounds[4])) / 2)
                }
            });
        }
    });
    
    // Metinleri parse et
    textMatches.forEach((match, index) => {
        const text = match.match(/text="([^"]*)"/);
        const bounds = match.match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
        
        if (text && text[1].trim()) {
            texts.push({
                id: index + 1,
                type: 'text',
                text: text[1],
                bounds: bounds ? {
                    left: parseInt(bounds[1]),
                    top: parseInt(bounds[2]),
                    right: parseInt(bounds[3]),
                    bottom: parseInt(bounds[4])
                } : null
            });
        }
    });
    
    return {
        timestamp: new Date().toISOString(),
        summary: {
            totalButtons: buttons.length,
            totalClickableElements: clickableElements.length,
            totalTexts: texts.length
        },
        buttons,
        clickableElements,
        texts
    };
}

// Ekrandaki butonları listele
function listScreenButtons() {
    console.log('📱 Ekrandaki butonlar listeleniyor...');
    try {
        // ADB bağlantısını kontrol et
        if (!checkAdbConnection()) {
            console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
            process.exit(1);
        }

        // UI dump al
        console.log('🔍 UI dump alınıyor...');
        runAdbCommand('adb shell uiautomator dump /sdcard/ui_dump.xml');
        
        // XML dosyasını oku
        console.log('📋 Butonlar analiz ediliyor...');
        const xmlResult = execSync('adb shell cat /sdcard/ui_dump.xml', { encoding: 'utf8' });
        
        // XML'i JSON'a çevir
        const jsonData = parseXmlToJson(xmlResult);
        
        // Data klasörüne kaydet
        const filepath = path.join('data', 'buttons.json');
        
        fs.writeFileSync(filepath, JSON.stringify(jsonData, null, 2));
        console.log(`✅ Buton listesi kaydedildi: ${filepath}`);
        console.log(`📊 Toplam buton: ${jsonData.summary.totalButtons}`);
        console.log(`🎯 Tıklanabilir element: ${jsonData.summary.totalClickableElements}`);
        console.log(`📝 Metin: ${jsonData.summary.totalTexts}`);
        
    } catch (error) {
        console.error('❌ Buton listesi alınırken hata:', error.message);
        console.log('🔧 Alternatif yöntemler:');
        console.log('1. Cihazın ekranı açık mı kontrol edin');
        console.log('2. USB Debugging açık mı kontrol edin');
        console.log('3. Cihazı yeniden başlatın');
        throw error;
    }
}

// Ana fonksiyon - bağımsız çalışabilir
function main() {
    console.log('🚀 Buton listesi işlemi başlatılıyor...\n');
    
    try {
        listScreenButtons();
        console.log('\n✨ Buton listesi işlemi tamamlandı!');
        process.exit(0);
        
    } catch (error) {
        console.error('\n💥 İşlem başarısız:', error.message);
        process.exit(1);
    }
}

// Script çalıştırıldığında kontrol et
if (require.main === module) {
    main();
}

module.exports = {
    listScreenButtons,
    parseXmlToJson
};
