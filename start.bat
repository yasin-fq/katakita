@echo off
cd /d "%~dp0"
echo 🦉 Menjalankan Katakita di http://localhost:8080
echo    Tekan Ctrl+C untuk berhenti
echo.
python -m http.server 8080
if errorlevel 1 (
  echo Python tidak ditemukan. Coba pakai: npx serve
  npx serve -l 8080
)
pause
