@echo off
setlocal enabledelayedexpansion

echo --------------------------------------------
echo   FFmpeg Toplu Video Dönüştürücü (H.265)
echo   Orijinalleri siler, aynı isimle kaydeder
echo --------------------------------------------
echo.

REM Döngü: Mevcut ve alt klasörlerdeki tüm .mp4 dosyalarını işle
for /R %%A in (*.mp4) do (
    echo Dönüştürülüyor: %%A
    set "input=%%A"
    set "temp=%%~dpnA_temp.mp4"

    REM FFmpeg dönüştürme komutu
    ffmpeg -i "%%A" -c:v libx265 -crf 24 -preset medium -c:a copy "!temp!" -y

    REM Dönüştürme başarılı olduysa
    if exist "!temp!" (
        del "%%A"
        ren "!temp!" "%%~nxA"
        echo Tamamlandı: %%A
    ) else (
        echo Hata: %%A dönüştürülemedi.
    )
    echo.
)

echo --------------------------------------------
echo   İşlem tamamlandı!
echo --------------------------------------------
pause
