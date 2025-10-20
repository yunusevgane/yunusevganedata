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

// Instagram uygulamasını aç
function openInstagram() {
    console.log('📱 Instagram uygulaması açılıyor...');
    try {
        // Önce Instagram'ı kapat (eğer açıksa)
        console.log('🔄 Instagram kapatılıyor...');
        runAdbCommand('adb shell am force-stop com.instagram.android');
        
        // Monkey ile Instagram'ı aç (daha etkili)
        console.log('📱 Instagram açılıyor...');
        runAdbCommand('adb shell monkey -p com.instagram.android -c android.intent.category.LAUNCHER 1');
        console.log('✅ Instagram başarıyla açıldı');
        
    } catch (error) {
        console.error('❌ Instagram açılırken hata:', error.message);
        console.log('🔧 Alternatif yöntemler:');
        console.log('1. Cihazda "İş" sekmesini seçin');
        console.log('2. Manuel olarak Instagram\'ı açmayı deneyin');
        console.log('3. Cihazı yeniden başlatın');
        throw error;
    }
}

// TikTok uygulamasını aç
function openTikTok() {
    console.log('📱 TikTok uygulaması açılıyor...');
    try {
        runAdbCommand('adb shell am force-stop com.zhiliaoapp.musically');
        runAdbCommand('adb shell monkey -p com.zhiliaoapp.musically -c android.intent.category.LAUNCHER 1');
        console.log('✅ TikTok başarıyla açıldı');
    } catch (error) {
        console.error('❌ TikTok açılırken hata:', error.message);
        throw error;
    }
}

// YouTube uygulamasını aç
function openYouTube() {
    console.log('📱 YouTube uygulaması açılıyor...');
    try {
        runAdbCommand('adb shell am force-stop com.google.android.youtube');
        runAdbCommand('adb shell monkey -p com.google.android.youtube -c android.intent.category.LAUNCHER 1');
        console.log('✅ YouTube başarıyla açıldı');
    } catch (error) {
        console.error('❌ YouTube açılırken hata:', error.message);
        throw error;
    }
}

// Ana fonksiyon - bağımsız çalışabilir
function main() {
    console.log('🚀 Uygulama açma işlemi başlatılıyor...\n');
    
    try {
        const args = process.argv.slice(2);
        
        if (args.length === 0) {
            console.log('❌ Kullanım: node modules/app.js [uygulama]');
            console.log('📋 Mevcut uygulamalar:');
            console.log('  instagram  - Instagram uygulamasını aç');
            console.log('  tiktok     - TikTok uygulamasını aç');
            console.log('  youtube    - YouTube uygulamasını aç');
            process.exit(1);
        }
        
        const app = args[0];
        
        switch (app) {
            case 'instagram':
                openInstagram();
                break;
            case 'tiktok':
                openTikTok();
                break;
            case 'youtube':
                openYouTube();
                break;
            default:
                console.log('❌ Geçersiz uygulama. Kullanım: node modules/app.js [uygulama]');
                console.log('📋 Mevcut uygulamalar: instagram, tiktok, youtube');
                process.exit(1);
        }
        
        console.log('\n✨ Uygulama açma işlemi tamamlandı!');
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
    openInstagram,
    openTikTok,
    openYouTube
};
