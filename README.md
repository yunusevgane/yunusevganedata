# Sosyal Medya İçerik Yönetim Sistemi

> **📚 Detaylı Dokümantasyon**: Tüm detaylı bilgiler `bilgi/` klasöründe modüler dosyalarda bulunur.

## 📂 Hızlı Erişim

- **JSON Format Kuralları** → [`bilgi/json-format.md`](bilgi/json-format.md)
- **Firma Bilgileri** → [`bilgi/firmalar.md`](bilgi/firmalar.md)
- **Video Dönüştürme** → [`bilgi/video-donusturme.md`](bilgi/video-donusturme.md)
- **İş Akışı** → [`bilgi/is-akisi.md`](bilgi/is-akisi.md)
- **ID Yapısı** → [`bilgi/id-yapisi.md`](bilgi/id-yapisi.md)

## 📋 JSON Dosyası Oluşturma Kuralları

### 🎯 Genel İşlem Sırası

1. **Video Dönüştürme**: Klasördeki videoları önce `start.bat` ile H.265 formatına çevir
2. **Text Dosyaları Oku**: Klasördeki tüm `.text` ve `.txt` dosyalarını oku
3. **ID'leri Al**: `id.json` dosyasından doğru ID'leri al
4. **JSON Oluştur**: Aşağıdaki formata uygun JSON dosyası oluştur

### 📝 JSON Formatı

```json
{
    "data": [
        {
            "path": "hesap_adi",
            "id": "hesap_adi",
            "tiktok": "12345",
            "instagram": "67890",
            "title": "İçerik Başlığı",
            "keywords": "#Hashtag1, #Hashtag2, #Hashtag3",
            "description": "Detaylı içerik açıklaması..."
        }
    ]
}
```

### 🔑 Alan Kuralları

#### 1. **path** ve **id**
- Dosya/klasör adı ile aynı olmalı
- Küçük harfle yazılır
- Alt çizgi kullanılır (örn: `livabella_pastanesi`)

#### 2. **tiktok** ve **instagram**
- **MUTLAKA** `id.json` dosyasından alınmalı
- String formatında yazılır (örn: `"17915"`)
- TikTok yoksa `"0"` yazılır

**id.json Örneği:**
```json
{
    "yunusevgane": {
        "instagram": "17129",
        "tiktok": "17915"
    }
}
```

#### 3. **title**
- Text dosyasının ilk satırı başlık olarak kullanılır
- Eğer başlık YOK veya ÇOK KISA ise:
  - ❌ Kötü: `"böğürtlenli tartolet livabella pastanesi gaziantep emek"`
  - ✅ İyi: `"Livabella Pastanesi: Böğürtlenli Tartolet - Gaziantep Emek"`
  - Profesyonel ve açıklayıcı başlık oluştur

#### 4. **keywords**
- Text dosyasındaki hashtag'ler virgülle ayrılarak yazılır
- Format: `"#Tag1, #Tag2, #Tag3"`
- **Eğer keywords YOK ise:**
  - İçeriğe uygun 8-10 adet hashtag OLUŞTUR
  - Marka adı, lokasyon, ürün, kategori hashtag'leri ekle
  - Örnek: `"#LivabellaPastanesi, #BöğürtlenliTartolet, #GaziantepEmek, #Pastane, #Tatlı"`

#### 5. **description**
- Text dosyasının tam içeriği (hashtag'ler HARİÇ)
- **Eğer description YOK veya ÇOK KISA ise:**
  - Profesyonel ve çekici açıklama yaz
  - Marketing diline uygun olmalı
  - 2-3 paragraf uzunluğunda olabilir
  - Ürün/hizmet özelliklerini vurgula

### 🎬 Video Dönüştürme

Klasördeki videoları işlemek için:

```bash
cd 2025-XX-XX
..\start.bat
```

**start.bat Ne Yapar:**
- Tüm `.mp4` dosyalarını H.265 formatına çevirir
- Orijinal dosyaları silerek yerine sıkıştırılmışı koyar
- Dosya boyutunu önemli ölçüde azaltır

### ✅ Tam İşlem Örneği

**Klasör İçeriği:**
```
2025-11-01/
  ├── yunusevgane.mp4
  ├── yunusevgane.text
  ├── ajansmobil.mp4
  └── ajansmobil.txt
```

**İşlem Adımları:**

1. **Video Dönüştür:**
```bash
cd 2025-11-01
..\start.bat
```

2. **Text Dosyalarını Oku:**
- `yunusevgane.text` içeriğini oku
- `ajansmobil.txt` içeriğini oku

3. **ID'leri Kontrol Et:**
```json
// id.json'dan
"yunusevgane": { "instagram": "17129", "tiktok": "17915" }
"ajansmobil": { "instagram": "17142", "tiktok": "17923" }
```

4. **JSON Oluştur:**
```json
{
    "data": [
        {
            "path": "yunusevgane",
            "id": "yunusevgane",
            "tiktok": "17915",
            "instagram": "17129",
            "title": "...",
            "keywords": "#ContextArchitect, #AI, ...",
            "description": "..."
        },
        {
            "path": "ajansmobil",
            "id": "ajansmobil",
            "tiktok": "17923",
            "instagram": "17142",
            "title": "...",
            "keywords": "#SEOÇalışmaları, #AjansMobil, ...",
            "description": "..."
        }
    ]
}
```

### 🚨 Yaygın Hatalar

❌ **YANLIŞ:**
- `"data"` array'i olmadan direkt array başlatmak
- ID'leri `id.json` yerine kendin uydurmak
- `"path"` alanını unutmak
- Kısa title'ları olduğu gibi bırakmak
- Keywords boş bırakmak

✅ **DOĞRU:**
- Her zaman `{"data": [...]}` formatı kullan
- ID'leri SADECE `id.json`'dan al
- Tüm alanları eksiksiz doldur
- Title ve description'ı profesyonel yaz
- Keywords yoksa uygun hashtag'ler oluştur

### 📂 Dosya Yapısı

```
sosyalmedia/
├── id.json                 # Tüm hesapların ID'leri
├── start.bat               # Video dönüştürme scripti
├── 2025-11-01/            # Tarih klasörü
│   ├── yunusevgane.mp4
│   ├── yunusevgane.text
│   └── ...
├── 2025-11-01.json        # Oluşturulan JSON
└── README.md              # Bu dosya
```

### 💡 Notlar

- Her tarih klasörü için ayrı JSON dosyası oluşturulur
- JSON dosya adı: `YYYY-MM-DD.json` formatındadır
- Text dosyaları `.text` veya `.txt` uzantılı olabilir
- Video olmayan içerikler de JSON'a eklenir
- Bir hesabın hem Instagram hem TikTok ID'si olabilir
- TikTok yoksa `"tiktok": "0"` yazılır

### 🏢 Firma ve Hesap Bilgileri

JSON içerikleri oluştururken bu bilgileri kullan:

#### **Tadım Lokantası** (`tadimlokantasi`)
- **Sektör**: Restoran/Lokanta
- **Konum**: Gaziantep Küsget
- **Ürünler**: Sulu yemek, kahvaltı, kebap çeşitleri
- **Anahtar Kelimeler**: Gaziantep mutfağı, ev yemekleri, kebap, kahvaltı, lokanta

#### **Tigger Gift** (`tiggergiftcomtr`)
- **Sektör**: E-ticaret
- **Ürünler**: Bakır ürünler
- **Özellik**: Gaziantep bakır ürünleri, geleneksel el işçiliği
- **Anahtar Kelimeler**: Bakır, el işçiliği, Gaziantep, geleneksel sanat, online satış

#### **Yunus Sevgane** (`yunusevgane`)
- **Alan**: Context Architect, Yapay Zeka, Teknoloji
- **İçerik Türü**: Eğitsel, teknoloji odaklı
- **Dil**: Türkçe
- **Anahtar Kelimeler**: Context Architect, AI, yapay zeka, teknoloji, inovasyon, dijital

#### **Context Architect** (`contextarchitect`)
- **Alan**: Context Architecture
- **İçerik Türü**: Eğitsel, teknoloji odaklı
- **Dil**: İngilizce
- **Özellik**: Context Architecture kavramını farklı sektörlerde açıklar
- **Anahtar Kelimeler**: Context Architect, AI, technology, innovation, digital

#### **Ajans Mobil** (`ajansmobil`)
- **Sektör**: Dijital Pazarlama Ajansı
- **Hizmetler**: SEO, dijital pazarlama, web tasarım
- **Anahtar Kelimeler**: SEO, dijital pazarlama, web tasarım, sosyal medya

#### **Livabella Pastanesi** (`livabella_pastanesi`)
- **Sektör**: Pastane
- **Konum**: Gaziantep Emek
- **Ürünler**: Tatlı, pasta, tartolet
- **Anahtar Kelimeler**: Pastane, tatlı, pasta, Gaziantep

---

**Son Güncelleme:** 2025-11-01
**Versiyon:** 1.1
