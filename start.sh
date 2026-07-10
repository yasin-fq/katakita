#!/bin/bash
cd "$(dirname "$0")"
echo "🦉 Katakita berjalan di http://localhost:8080"
python3 -m http.server 8080 2>/dev/null || python -m http.server 8080
