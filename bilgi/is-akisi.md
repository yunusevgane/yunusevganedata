# İş Akışı - Tarih Klasöründen JSON Oluşturma

## 📋 Tam İşlem Sırası

### 1️⃣ Hazırlık
```bash
# Tarih klasörüne git
cd sosyalmedia/2025-11-01
```

**Kontrol Et:**
- [ ] `.mp4` dosyaları var mı?
- [ ] `.text` veya `.txt` dosyaları var mı?
- [ ] Hangi hesaplar var? (dosya adlarından bak)

---

### 2️⃣ Video Dönüştürme

**⚠️ ÖNEMLİ: Sadece yeni/büyük dosyaları işle!**

**Kontrol Et:**
- Hangi dosyalar büyük? (30MB+)
- Hangi dosyalar küçük? (10MB-)

**Büyük dosya yoksa → Bu adımı ATLA!**

**Büyük dosya varsa:**
```bash
# Video dönüştürme scriptini çalıştır
..\start.bat
```

**Beklenen Sonuç:**
- Yeni/büyük videolar H.265 formatına çevrildi ✅
- Dosya boyutları azaldı ✅
- Zaten küçük videolar değişmedi ✅

**İpucu:** Bu işlem uzun sürebilir, sabredelim! Ama zaten dönüştürülmüş videoları tekrar işlemiyoruz.

---

### 3️⃣ Text Dosyalarını Oku

Her hesap için text dosyasını oku:
- `yunusevgane.text`
- `ajansmobil.txt`
- `contextarchitect.text`
- vb.

**Dikkat Et:**
- İlk satır genellikle başlık
- Son satır genellikle hashtag'ler
- Ara kısım description

---

### 4️⃣ ID'leri Kontrol Et

`id.json` dosyasını aç ve ilgili hesapların ID'lerini bul:

```json
{
    "yunusevgane": {
        "instagram": "17129",
        "tiktok": "17915"
    }
}
```

**Önemli:** ID'leri kendin uydurma, MUTLAKA bu dosyadan al!

---

### 5️⃣ Firma Bilgilerini Hatırla

`bilgi/firmalar.md` dosyasına bak:
- Firma ne iş yapıyor?
- Hangi anahtar kelimeleri kullanmalısın?
- Ton nasıl olmalı?

---

### 6️⃣ JSON Oluştur

`sosyalmedia/2025-11-01.json` dosyasını oluştur.

**Kontrol Listesi:**
- [ ] `{"data": [...]}` formatı kullanıldı mı?
- [ ] Tüm ID'ler `id.json`'dan alındı mı?
- [ ] Title uygun mu? (kısa değil mi?)
- [ ] Keywords var mı? (yoksa oluşturuldu mu?)
- [ ] Description yeterli mi?
- [ ] Firma bilgilerine uygun mu?

---

### 7️⃣ Son Kontrol

JSON dosyasını aç ve kontrol et:

```bash
# JSON'u görüntüle
cat 2025-11-01.json
```

**Kontrol Noktaları:**
- [ ] JSON syntax doğru mu?
- [ ] Tüm videolar için içerik var mı?
- [ ] Boş alan (`""`) yok mu?
- [ ] ID'ler doğru mu?

---

## ✅ Örnek Zaman Çizelgesi

| Adım | Süre |
|------|------|
| Video dönüştürme | 5-15 dakika |
| Text okuma | 2-3 dakika |
| ID kontrolü | 1 dakika |
| JSON yazma | 5-10 dakika |
| Son kontrol | 2 dakika |
| **TOPLAM** | **15-30 dakika** |

---

## 🚨 Sık Yapılan Hatalar

1. ❌ Videoları dönüştürmeden JSON oluşturma
2. ❌ ID'leri `id.json`'dan almama
3. ❌ Firma bilgilerini kullanmama
4. ❌ Kısa title'ları olduğu gibi bırakma
5. ❌ Keywords oluşturmama

---

## 💡 İpuçları

- **Toplu işlem yapma**: Tek seferde 1 tarih klasörü işle
- **README'yi kontrol et**: İşlem öncesi her zaman README.md'ye bak
- **Firma bilgilerini kullan**: `bilgi/firmalar.md` çok önemli
- **Sabırlı ol**: Video dönüştürme uzun sürer

