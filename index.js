const upload = require('./modules/upload');
const app = require('./modules/app');
const buttons = require('./modules/buttons');
const screenshot = require('./modules/screenshot');
const elements = require('./modules/elements');
const texts = require('./modules/texts');
const { execSync } = require('child_process');

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

// Ana fonksiyon
function main() {
    console.log('🚀 Video yükleme işlemi başlatılıyor...\n');
    
    try {
        if (!checkAdbConnection()) {
            console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
            process.exit(1);
        }
        
        upload.clearCameraFolder();
        upload.uploadTodaysVideos();
        app.openInstagram();
        
        console.log('\n✨ Tüm işlemler tamamlandı! Script sonlandırılıyor...');
        process.exit(0);
        
    } catch (error) {
        console.error('\n💥 İşlem başarısız:', error.message);
        process.exit(1);
    }
}

// Script çalıştırıldığında kontrol et
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('❌ Kullanım: node index.js [komut]');
        console.log('📋 Mevcut komutlar:');
        console.log('  yukle        - Videoları yükle ve Instagram aç');
        console.log('  instagram    - Sadece Instagram uygulamasını aç');
        console.log('  tiktok       - Sadece TikTok uygulamasını aç');
        console.log('  youtube      - Sadece YouTube uygulamasını aç');
        console.log('  buttons      - Ekrandaki butonları listele');
        console.log('  elements     - Tıklanabilir elementleri listele');
        console.log('  texts        - Ekrandaki metinleri listele');
        console.log('  screenshot   - Ekran görüntüsü al');
        console.log('  size         - Ekran boyutunu göster');
        process.exit(1);
    }
    
    const command = args[0];
    
    switch (command) {
        case 'yukle':
            main();
            break;
        case 'instagram':
            if (!checkAdbConnection()) {
                console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
                process.exit(1);
            }
            app.openInstagram();
            break;
        case 'tiktok':
            if (!checkAdbConnection()) {
                console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
                process.exit(1);
            }
            app.openTikTok();
            break;
        case 'youtube':
            if (!checkAdbConnection()) {
                console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
                process.exit(1);
            }
            app.openYouTube();
            break;
        case 'buttons':
            if (!checkAdbConnection()) {
                console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
                process.exit(1);
            }
            buttons.listScreenButtons();
            break;
        case 'elements':
            if (!checkAdbConnection()) {
                console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
                process.exit(1);
            }
            elements.listClickableElements();
            break;
        case 'texts':
            if (!checkAdbConnection()) {
                console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
                process.exit(1);
            }
            texts.listScreenTexts();
            break;
        case 'screenshot':
            if (!checkAdbConnection()) {
                console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
                process.exit(1);
            }
            screenshot.takeScreenshot();
            break;
        case 'size':
            if (!checkAdbConnection()) {
                console.log('\n💥 ADB bağlantısı kurulamadı. Lütfen cihazı bağlayın ve tekrar deneyin.');
                process.exit(1);
            }
            screenshot.getScreenSize();
            break;
        default:
            console.log('❌ Geçersiz komut. Kullanım: node index.js [komut]');
            console.log('📋 Mevcut komutlar: yukle, instagram, tiktok, youtube, buttons, elements, texts, screenshot, size');
            process.exit(1);
    }
}

module.exports = { main };