@echo off
cd /d "%~dp0"
echo 🦉 Katakita berjalan di http://localhost:8080
python -m http.server 8080
pause
