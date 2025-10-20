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

// Ekran görüntüsü al
function takeScreenshot() {
    console.log('📸 Ekran görüntüsü alınıyor...');
    try {
        const filepath = path.join('data', 'screenshot.png');
        
        runAdbCommand('adb shell screencap -p /sdcard/screenshot.png');
        runAdbCommand(`adb pull /sdcard/screenshot.png ${filepath}`);
        console.log(`✅ Ekran görüntüsü alındı: ${filepath}`);
        
    } catch (error) {
        console.error('❌ Ekran görüntüsü alınırken hata:', error.message);
        throw error;
    }
}

// Ekran boyutunu al
function getScreenSize() {
    console.log('📏 Ekran boyutu alınıyor...');
    try {
        const result = execSync('adb shell wm size', { encoding: 'utf8' });
        
        // Data klasörüne kaydet
        const filepath = path.join('data', 'screen_size.txt');
        
        fs.writeFileSync(filepath, result);
        console.log(`✅ Ekran boyutu kaydedildi: ${filepath}`);
        console.log(`📏 Ekran boyutu: ${result.trim()}`);
        
    } catch (error) {
        console.error('❌ Ekran boyutu alınırken hata:', error.message);
        throw error;
    }
}

// Ekran görüntüsü ve boyut bilgilerini al
function captureScreenInfo() {
    console.log('📸 Ekran bilgileri alınıyor...');
    try {
        takeScreenshot();
        getScreenSize();
        console.log('✅ Ekran bilgileri başarıyla alındı');
    } catch (error) {
        console.error('❌ Ekran bilgileri alınırken hata:', error.message);
        throw error;
    }
}

// Ana fonksiyon - bağımsız çalışabilir
function main() {
    console.log('🚀 Ekran görüntüsü işlemi başlatılıyor...\n');
    
    try {
        // ADB bağlantısını kontrol et
        if (!checkAdbConnection()) {
            console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
            process.exit(1);
        }

        captureScreenInfo();
        console.log('\n✨ Ekran görüntüsü işlemi tamamlandı!');
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
    takeScreenshot,
    getScreenSize,
    captureScreenInfo
};
