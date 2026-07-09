#!/bin/bash
# Katakita - Static Server Starter
# Jalankan file ini untuk membuka aplikasi di browser
cd "$(dirname "$0")"
echo "🦉 Menjalankan Katakita di http://localhost:8080"
echo "   Tekan Ctrl+C untuk berhenti"
echo ""
python3 -m http.server 8080 2>/dev/null || python -m http.server 8080 2>/dev/null || {
  echo "❌ Python tidak ditemukan. Coba pakai: npx serve"
  npx serve -l 8080
}
