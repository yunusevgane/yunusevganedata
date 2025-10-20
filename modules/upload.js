const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Camera klasörünü temizle
function clearCameraFolder() {
    console.log('📱 Camera klasörü temizleniyor...');
    runAdbCommand('adb shell rm -rf /sdcard/DCIM/Camera/*');
    console.log('✅ Camera klasörü temizlendi');
}

// Bugünün videolarını yükle
function uploadTodaysVideos() {
    console.log('📅 Bugünün videoları yükleniyor...');
    
    const today = new Date().toISOString().split('T')[0];
    console.log(`📁 Bugünün klasörü: ${today}`);
    
    if (!fs.existsSync(today)) {
        console.log(`⚠️  ${today} klasörü bulunamadı`);
        return;
    }
    
    const videoFiles = fs.readdirSync(today).filter(file => file.endsWith('.mp4'));
    
    if (videoFiles.length === 0) {
        console.log(`⚠️  ${today} klasöründe video bulunamadı`);
        return;
    }
    
    console.log(`🎬 Bulunan videolar: ${videoFiles.join(', ')}`);
    
    videoFiles.forEach(videoFile => {
        const sourcePath = path.join(today, videoFile);
        console.log(`📤 Yükleniyor: ${videoFile}`);
        
        try {
            runAdbCommand(`adb push "${sourcePath}" /sdcard/DCIM/Camera/`);
            console.log(`✅ ${videoFile} başarıyla yüklendi`);
        } catch (error) {
            console.error(`❌ ${videoFile} yüklenirken hata:`, error.message);
        }
    });
    
    console.log('\n🎉 Bugünün videoları yüklendi!');
}

// Ana fonksiyon - bağımsız çalışabilir
function main() {
    console.log('🚀 Video yükleme işlemi başlatılıyor...\n');
    
    try {
        const args = process.argv.slice(2);
        
        if (args.length === 0) {
            console.log('❌ Kullanım: node modules/upload.js [komut]');
            console.log('📋 Mevcut komutlar:');
            console.log('  clear       - Camera klasörünü temizle');
            console.log('  upload      - Bugünün videolarını yükle');
            console.log('  full        - Temizle ve yükle (tam işlem)');
            process.exit(1);
        }
        
        const command = args[0];
        
        switch (command) {
            case 'clear':
                clearCameraFolder();
                break;
            case 'upload':
                uploadTodaysVideos();
                break;
            case 'full':
                clearCameraFolder();
                uploadTodaysVideos();
                break;
            default:
                console.log('❌ Geçersiz komut. Kullanım: node modules/upload.js [komut]');
                console.log('📋 Mevcut komutlar: clear, upload, full');
                process.exit(1);
        }
        
        console.log('\n✨ Video yükleme işlemi tamamlandı!');
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
    clearCameraFolder,
    uploadTodaysVideos
};
