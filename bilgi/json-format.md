# JSON Format Kuralları

## 📝 Temel Yapı

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

## 🔑 Zorunlu Alanlar

### 1. path ve id
- **Değer**: Dosya/klasör adı ile aynı
- **Format**: Küçük harf, alt çizgi ile (örn: `livabella_pastanesi`)
- **Önemli**: Her ikisi de aynı değerde olmalı

### 2. tiktok ve instagram
- **Kaynak**: `id.json` dosyasından MUTLAKA alınır
- **Format**: String (örn: `"17915"`)
- **TikTok yoksa**: `"0"` yazılır
- **ASLA kendin üretme!**

### 3. title
- **Kaynak**: Text dosyasının ilk satırı
- **Kısa/yoksa**: Profesyonel başlık oluştur

**Örnek:**
- ❌ Kötü: `"böğürtlenli tartolet livabella pastanesi gaziantep emek"`
- ✅ İyi: `"Livabella Pastanesi: Böğürtlenli Tartolet - Gaziantep Emek"`

### 4. keywords
- **Kaynak**: Text dosyasındaki hashtag'ler
- **Format**: `"#Tag1, #Tag2, #Tag3"` (virgülle ayrılmış)
- **Yoksa**: İçeriğe uygun 8-10 hashtag OLUŞTUR

**Keywords Oluşturma:**
- Marka adı
- Lokasyon
- Ürün/Hizmet
- Kategori
- Sektör

### 5. description
- **Kaynak**: Text dosyasının tamamı (hashtag'ler HARİÇ)
- **Kısa/yoksa**: Profesyonel açıklama yaz
- **Uzunluk**: 2-3 paragraf ideal
- **Ton**: Marketing diline uygun, çekici

## 🚨 Yaygın Hatalar

❌ **YAPMA:**
1. `"data"` array'i olmadan başlama
2. ID'leri `id.json` yerine kendin uydurma
3. `"path"` alanını unutma
4. Kısa title'ları olduğu gibi bırakma
5. Keywords'ü boş bırakma

✅ **YAP:**
1. Her zaman `{"data": [...]}` kullan
2. ID'leri SADECE `id.json`'dan al
3. Tüm alanları eksiksiz doldur
4. Profesyonel title ve description yaz
5. Uygun keywords oluştur

## 📋 Dosya Adı Formatı

- **Format**: `YYYY-MM-DD.json`
- **Örnek**: `2025-11-01.json`
- **Konum**: `sosyalmedia/` klasörünün ana dizini

