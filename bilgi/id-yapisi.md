# id.json Dosya Yapısı

## 📝 Format

```json
{
    "hesap_adi": {
        "instagram": "12345",
        "tiktok": "67890"
    }
}
```

## 🔑 Mevcut Hesaplar

### yunusevgane
```json
{
    "instagram": "17129",
    "tiktok": "17915"
}
```

### ajansmobil
```json
{
    "instagram": "17142",
    "tiktok": "17923"
}
```

### contextarchitect
```json
{
    "instagram": "17139",
    "tiktok": "0"
}
```
**Not:** TikTok hesabı yok, bu yüzden `"0"`

### tadimlokantasi
```json
{
    "instagram": "17132",
    "tiktok": "17916"
}
```

### ataklifecom
```json
{
    "instagram": "17137",
    "tiktok": "0"
}
```
**Not:** TikTok hesabı yok

### hanbroscargo
```json
{
    "instagram": "17133",
    "tiktok": "17917"
}
```

### antepagzi
```json
{
    "instagram": "17138",
    "tiktok": "17920"
}
```

### tiggergiftcomtr
```json
{
    "instagram": "17135",
    "tiktok": "17919"
}
```

### livabella_pastanesi
```json
{
    "instagram": "19391",
    "tiktok": "0"
}
```
**Not:** TikTok hesabı yok

## ⚠️ Önemli Kurallar

1. **ASLA kendin ID üretme!**
   - Tüm ID'ler bu dosyadan alınmalı
   - Yeni hesap ekleniyorsa bu dosyaya eklenmeli

2. **TikTok yoksa `"0"` yaz**
   - Boş string (`""`) değil
   - `"0"` string formatında

3. **ID'ler string formatında**
   - ❌ `17915` (sayı)
   - ✅ `"17915"` (string)

4. **Hesap adı = Dosya adı**
   - `id.json`'daki key = text dosyasının adı
   - Küçük harf, alt çizgi kullan

## 🆕 Yeni Hesap Ekleme

Yeni bir hesap eklemek için:

1. `id.json` dosyasını aç
2. En son hesaptan sonra virgül koy
3. Yeni hesabı ekle:
```json
{
    ...,
    "yeni_hesap": {
        "instagram": "XXXXX",
        "tiktok": "YYYYY"
    }
}
```
4. TikTok yoksa `"tiktok": "0"` yaz
5. Dosyayı kaydet

## 📋 Hızlı Referans Tablosu

| Hesap | Instagram | TikTok | TikTok Var mı? |
|-------|-----------|--------|----------------|
| yunusevgane | 17129 | 17915 | ✅ |
| ajansmobil | 17142 | 17923 | ✅ |
| contextarchitect | 17139 | 0 | ❌ |
| tadimlokantasi | 17132 | 17916 | ✅ |
| ataklifecom | 17137 | 0 | ❌ |
| hanbroscargo | 17133 | 17917 | ✅ |
| antepagzi | 17138 | 17920 | ✅ |
| tiggergiftcomtr | 17135 | 17919 | ✅ |
| livabella_pastanesi | 19391 | 0 | ❌ |

