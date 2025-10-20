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

// Ekrandaki metinleri listele
function listScreenTexts() {
    console.log('📱 Ekrandaki metinler listeleniyor...');
    try {
        // UI dump al
        runAdbCommand('adb shell uiautomator dump /sdcard/ui_dump.xml');
        
        // Metinleri çıkar
        console.log('📝 Ekrandaki metinler:');
        const result = execSync('adb shell cat /sdcard/ui_dump.xml', { encoding: 'utf8' });
        
        // Data klasörüne kaydet
        const filepath = path.join('data', 'texts.xml');
        
        fs.writeFileSync(filepath, result);
        console.log(`✅ Metin listesi kaydedildi: ${filepath}`);
        
    } catch (error) {
        console.error('❌ Metin listesi alınırken hata:', error.message);
        throw error;
    }
}

// Ana fonksiyon - bağımsız çalışabilir
function main() {
    console.log('🚀 Metin listesi işlemi başlatılıyor...\n');
    
    try {
        // ADB bağlantısını kontrol et
        if (!checkAdbConnection()) {
            console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
            process.exit(1);
        }

        listScreenTexts();
        console.log('\n✨ Metin listesi işlemi tamamlandı!');
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
    listScreenTexts
};
