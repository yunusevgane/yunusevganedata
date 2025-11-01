# Video Dönüştürme İşlemi

## 🎬 start.bat Kullanımı

### Ne Yapar?
- Tüm `.mp4` dosyalarını **H.265 (HEVC)** formatına çevirir
- Orijinal dosyaları silerek yerine sıkıştırılmışı koyar
- Dosya boyutunu önemli ölçüde azaltır (genellikle %30-60)
- Video kalitesini korur

### Kullanım

```bash
# Tarih klasörüne gir
cd 2025-11-01

# Video dönüştürme scriptini çalıştır
..\start.bat
```

### İşlem Adımları

1. **Klasöre Git**: Videoların olduğu tarih klasörüne cd ile git
2. **Script Çalıştır**: `start.bat` dosyasını çalıştır
3. **Bekle**: Her video sırayla işlenir
4. **Kontrol Et**: İşlem bitince videoların boyutuna bak

### Örnek Çıktı

```
--------------------------------------------
  FFmpeg Toplu Video Dönüştürücü (H.265)
  Orijinalleri siler, aynı isimle kaydeder
--------------------------------------------

Dönüştürülüyor: yunusevgane.mp4
...
Tamamlandı: yunusevgane.mp4

Dönüştürülüyor: ajansmobil.mp4
...
Tamamlandı: ajansmobil.mp4
```

## ⚠️ Önemli Notlar

- **Geri alınamaz**: Orijinal dosyalar silinir!
- **Yedek al**: Önemli videolardan önce yedek almayı unutma
- **İşlemci yoğun**: CPU'nun çok çalışacağını bil
- **Zaman alır**: Büyük dosyalar uzun sürebilir

### 🚨 Kritik: Sadece Yeni/Değişen Dosyaları İşle

**start.bat tüm MP4 dosyalarını işler!** Ancak:

- ✅ Sadece yeni eklenen veya değişen videoları dönüştür
- ❌ Zaten dönüştürülmüş videoları TEKRAR işleme

**Nasıl Anlarım?**
- Büyük boyutlu dosyalar (30MB+) → Henüz dönüştürülmemiş
- Küçük boyutlu dosyalar (10MB altı) → Zaten dönüştürülmüş

**Örnek:**
```
ajansmobil.mp4 → 9.3MB  ✅ Dönüştürülmüş, ATLAYILIR
livabella_pastanesi.mp4 → 45MB  ❌ YENİ, İŞLENMELİ
tiggergiftcomtr.mp4 → 70MB  ❌ YENİ, İŞLENMELİ
```

**Öneri:**
- Klasöre girmeden önce dosya boyutlarına bak
- Sadece büyük dosyalar varsa start.bat çalıştır
- Tüm dosyalar küçükse video dönüştürme adımını ATLA

## 📊 Tipik Boyut Azaltmaları

- 10MB → 4-6MB
- 13MB → 5-8MB
- 44MB → 7-15MB

## 🔧 Teknik Detaylar

- **Codec**: libx265 (HEVC)
- **CRF**: 24 (Kalite dengesi)
- **Preset**: medium (Hız-kalite dengesi)
- **Audio**: Copy (Ses yeniden kodlanmaz)

