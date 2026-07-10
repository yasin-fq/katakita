# 📚 KataKita — Aplikasi Belajar Membaca Bahasa Indonesia untuk Anak

**Versi: KataKita 2.1 (beta)** · Dibuat oleh QAF Studio

Aplikasi PWA (Progressive Web App) belajar membaca bahasa Indonesia untuk anak TK–SD. Menggunakan metode suku kata & fonik, suara Bahasa Indonesia asli, permainan edukatif, perpustakaan cerita interaktif, dan sertifikat penghargaan. Bisa dipasang di HP/tablet dan dipakai **offline** tanpa internet.

![Logo Katakita](public/katakita-owl.svg)

---

## 📋 Daftar Isi

1. [Fitur Utama](#-fitur-utama)
2. [Cara Menjalankan](#-cara-menjalankan)
3. [Konfigurasi (config.js)](#-konfigurasi-configjs)
4. [Setup Login Google Apps Script](#-setup-login-google-apps-script)
5. [Build Static & Deploy](#-build-static--deploy)
6. [Struktur Proyek](#-struktur-proyek)
7. [Branding & Teknologi](#-branding--teknologi)
8. [FAQ & Troubleshooting](#-faq--troubleshooting)
9. [Lisensi & Credits](#-lisensi--credits)

---

## ✨ Fitur Utama

### 📖 Kurikulum 6 Level (115+ Pelajaran)

Kurikulum bertingkat dari huruf dasar hingga cerita pendek, menggunakan metode suku kata (metode terbaik untuk membaca bahasa Indonesia):

| Level | Judul | Jumlah | Fokus Belajar |
|-------|-------|--------|---------------|
| **1** | Pengenalan Huruf | 26 pelajaran | Huruf A–Z (vokal dulu), besar & kecil |
| **2** | Suku Kata | 22 pelajaran | ba-bi-bu-be-bo per konsonan + suku tertutup |
| **3** | Kata Sederhana | 18 pelajaran | Kata tema (keluarga, hewan, buah, dll.) |
| **4** | Diftong, Digraf & Suku Tertutup | 15 pelajaran | ai/au, kh/ng/sy, suku tertutup |
| **5** | Kalimat Sederhana | 19 pelajaran | Kalimat 3–5 kata |
| **6** | Cerita Pendek | 15 cerita | Cerita + soal pemahaman |

Setiap pelajaran punya 2 fase: **Belajar** (konten interaktif + suara) dan **Kuis** (4 soal acak dari 8 tipe soal). Sistem bintang 0–3 berdasarkan akurasi kuis.

### 📚 Perpustakaan Cerita (10 Cerita Interaktif)

10 cerita pendek dengan 3 tingkat kesulitan (Mudah/Sedang/Sulit):

- 🐱 Kucing Oreo · 🌳 Bermain di Taman · 🎒 Hari Pertama Sekolah
- 🐇 Kelinci dan Kura-kura · 🌈 Mencari Pelangi · 🍳 Masakan Nenek
- 🐜 Semut dan Gajah · ⭐ Bintang yang Jatuh · 🥕 Kebun Kakek · 👕 Kaus Merah Andi

Setiap cerita punya 3 fase: **Baca** (paragraf + TTS per paragraf), **Kata Baru** (kosakata + arti), **Soal** (3 soal pemahaman dengan bintang).

### 🧩 Suku Kata Builder

Alat interaktif untuk membentuk suku kata dan kata:
- Pilih konsonan (huruf mati) lalu vokal (huruf hidup) → bentuk suku kata
- Gabungkan beberapa suku kata jadi kata
- Tekan untuk dengar bunyi setiap suku/kata
- 8 contoh kata inspirasi (bubu, kaki, buku, susu, mama, papa, kue, roda)

### 🎮 4 Mini-Games Edukatif

1. **Game Memori** 🃏 — cari pasangan kartu (huruf/kata/gambar)
2. **Cocokkan Gambar & Kata** 🔗 — hubungkan gambar dengan kata
3. **Susun Huruf** 🔤 — susun huruf acak jadi kata benar
4. **Latihan Bebas** 🎯 — kuis acak dari semua level

Skor & bintang game tersimpan di localStorage.

### 📝 Fitur Pendukung Lengkap

- **TTS Bahasa Indonesia** — Web Speech API dengan voice id-ID, rate ramah anak
- **Efek Suara** — Web Audio API (benar, salah, bintang, selesai, dll.) — bekerja offline
- **Latihan Menulis** — tracing huruf di canvas dengan jari/mouse
- **Tantangan Harian** — 5 soal acak, beda setiap hari, sistem streak
- **Tabel Huruf & Suku** — referensi visual A–Z dan ba-bi-bu-be-bo
- **Kata Hari Ini** — kata baru setiap hari di home screen
- **Sertifikat Unduh** — sertifikat akhir level bisa diunduh sebagai gambar PNG

### 👨‍👩‍👧 Fitur untuk Orang Tua

- **Dasbor Orang Tua** — statistik lengkap: pelajaran, bintang, sertifikat, badge, akurasi, streak, progress per level, statistik game
- **Multi-Profil Anak** — dukung banyak anak, masing-masing dengan progress terpisah
- **Sistem Streak** — motivasi belajar harian (streak berjalan & rekor)
- **22 Badge Achievements** — lencana untuk berbagai pencapaian

### 🔐 Sistem Login dengan Gate

Login opsional dengan **gate** (pintu masuk) yang hanya muncul saat user belum login:

- **Gate di Pelajaran 10 Level 1** — akses pelajaran lanjutan
- **Gate di Profil Anak** — kelola profil butuh login
- **Gate di Akses Cepat** — Tabel Huruf, Menulis, Tabel Suku, pilih cerita, pilih game
- **Tanya sekali** — setelah login, tidak ada gate dimanapun (login tersimpan di localStorage sampai logout)
- **Backend gratis** — Google Sheets + Google Apps Script

### 📱 PWA (Progressive Web App)

- ✅ **Dapat dipasang** di HP/tablet (Add to Home Screen)
- ✅ **Offline** — service worker cache aset & halaman
- ✅ **App-like** — fullscreen, no browser chrome
- ✅ **Back button Android** — kembali ke screen sebelumnya (bukan exit langsung)
- ✅ **Ikon sendiri** — logo owl di launcher & tab browser

---

## 🚀 Cara Menjalankan

### Opsi 1: Versi Static (Termudah — Tanpa Install)

**Untuk pengguna akhir:**

1. Download `katakita-static-deploy.zip`
2. Extract zip
3. Pilih salah satu:
   - **Double-click `index.html`** → langsung jalan di browser
   - **Double-click `start.sh`** (Mac/Linux) atau `start.bat` (Windows) → HTTP server di `http://localhost:8080`
4. Edit `config.js` untuk set URL Google Apps Script (lihat [Konfigurasi](#-konfigurasi-configjs))

**Untuk deploy ke hosting:**
- Upload isi folder ke hosting static (Netlify, Vercel, GitHub Pages, Cloudflare Pages)
- Tidak butuh server Node.js

### Opsi 2: Versi Development (Untuk Developer)

**Prasyarat:** Node.js 18+ atau Bun

```bash
# Install dependencies
bun install

# Jalankan dev server
bun run dev
# Buka http://localhost:3000

# Build production (static export)
bun run build
# Hasil di folder out/

# Lint
bun run lint

# Generate ikon PWA dari logo SVG
bun run scripts/gen-icons.mjs
```

---

## ⚙️ Konfigurasi (config.js)

File `config.js` berisi pengaturan yang **bisa diubah tanpa rebuild**. Edit dengan text editor (Notepad, VS Code, dll):

```javascript
window.KATAKITA_CONFIG = {
  // 1. URL Google Apps Script untuk login/register
  //    Dapatkan dari Deploy > Web app di Apps Script editor
  appsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",

  // 2. Mode Pengujian: true (ON) / false (OFF)
  //    ON  = semua level & pelajaran terbuka (tanpa perlu selesaikan level sebelumnya)
  //    OFF = level terkunci sampai selesaikan level sebelumnya (default)
  devMode: false,

  // 3. Link untuk mendapatkan kode akses (tampil di halaman pendaftaran)
  //    Ganti dengan link Anda (lynk.id, wa.me, website, dll)
  accessCodeUrl: "https://lynk.id/qafstudio",
};
```

| Setting | Fungsi | Default |
|---------|--------|---------|
| `appsScriptUrl` | URL Google Apps Script untuk login/register | `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` |
| `devMode` | Mode pengujian (semua level terbuka) | `false` |
| `accessCodeUrl` | Link "dapatkan kode akses" di pendaftaran | `https://lynk.id/qafstudio` |

---

## 🔐 Setup Login Google Apps Script

Sistem login menggunakan **Google Sheets + Google Apps Script** sebagai database gratis. Panduan lengkap ada di file `SETUP-GOOGLE-APPS-SCRIPT.md`.

### Ringkasan Setup

1. **Buat Google Spreadsheet** dengan header: Name, Email, Phone, Password, Token, CreatedAt
2. **Buka Apps Script** (Extensions → Apps Script), paste kode dari `google-apps-script.js`
3. **Set konfigurasi** di Apps Script:
   ```javascript
   var SPREADSHEET_ID = "ID_SPREADSHEET_ANDA";
   var VALID_ACCESS_CODES = ["KODE_AKSES_20_KARAKTER"];
   ```
4. **Deploy sebagai Web App**: Execute as Me, Who has access: Anyone
5. **Copy URL Web App**, paste ke `config.js`:
   ```javascript
   appsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",
   ```

### Generate Kode Akses

Kode akses adalah 20 karakter alfanumerik yang user masukkan saat registrasi. Generate di Apps Script:

```javascript
function generateAccessCodes() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 10; i++) {
    var code = "";
    for (var j = 0; j < 20; j++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    Logger.log(code);
  }
}
```

Distribusikan kode via lynk.id, WhatsApp, atau platform lain.

### Cara Kerja Gate Login

```
User akses fitur (Profil/Lesson 10/Akses Cepat)
        │
        ▼
   Cek isLoggedIn()
   (localStorage "katakita-auth")
        │
        ├── SUDAH LOGIN → lanjut ke fitur (tanpa gate)
        │
        └── BELUM LOGIN → redirect ke Auth Portal
                                │
                                ▼
                    User login/register
                    (fetch ke Google Apps Script)
                                │
                                ├── GAGAL → tampilkan error
                                │
                                └── BERHASIL → setAuthUser()
                                        (simpan ke localStorage)
                                        │
                                        ▼
                                Redirect kembali ke fitur
```

---

## 📦 Build Static & Deploy

### Build

```bash
bun run build
# Hasil di folder out/ (static export)
```

### Isi Folder `out/`

```
out/
├── index.html              # Halaman utama
├── config.js               # Konfigurasi (edit URL Apps Script, devMode, dll)
├── _next/static/chunks/    # JS bundles (React, Next.js, komponen)
├── katakita-owl.svg        # Logo owl
├── favicon.ico/svg/png     # Favicon semua format
├── icon-192/512.png        # PWA icons
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (offline)
├── offline.html            # Fallback offline
├── start.sh / start.bat    # HTTP server runner
├── google-apps-script.js   # Backend code untuk Apps Script
└── SETUP-GOOGLE-APPS-SCRIPT.md  # Panduan setup login
```

### Deploy ke Hosting

| Hosting | Cara |
|---------|------|
| **Netlify** | Drag-drop folder `out/` ke dashboard |
| **Vercel** | `vercel deploy --prod out/` |
| **GitHub Pages** | Push isi `out/` ke branch `gh-pages` |
| **Cloudflare Pages** | Connect repo, output directory `out/` |
| **Server sendiri** | `python3 -m http.server 8000` di folder `out/` |

### Path Fix (Untuk Subpath Hosting)

Static build sudah di-patch dengan **relative paths** (`./_next/...`) sehingga berfungsi di:
- ✅ Root domain (`https://situs.com/`)
- ✅ Subpath (`https://user.github.io/katakita/`)
- ✅ Localhost (`http://localhost:8080/`)
- ✅ file:// protocol (double-click index.html)

---

## 📂 Struktur Proyek

```
katakita/
├── public/
│   ├── katakita-owl.svg        # Logo owl (utama)
│   ├── config.js               # Konfigurasi (appsScriptUrl, devMode, accessCodeUrl)
│   ├── favicon.ico/svg/png     # Favicon semua format
│   ├── icon-192/512.png        # PWA icons
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker (cache v1.3.0)
│   └── offline.html            # Fallback offline
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata PWA + favicon + config.js loader
│   │   ├── page.tsx            # Entry → AppShell
│   │   └── globals.css
│   ├── components/
│   │   ├── app-shell.tsx       # Router screen + Android back button history
│   │   ├── screens/            # 14 screen aplikasi
│   │   │   ├── onboarding.tsx
│   │   │   ├── home.tsx        # 6 quick access + 6 level cards
│   │   │   ├── level-detail.tsx
│   │   │   ├── certificate.tsx
│   │   │   ├── reading-library.tsx      # Perpustakaan Cerita (gate di pilih cerita)
│   │   │   ├── syllable-builder.tsx     # Suku Kata Builder
│   │   │   ├── daily-challenge.tsx
│   │   │   ├── parent-dashboard.tsx
│   │   │   ├── profile-manager.tsx      # Gate login
│   │   │   ├── auth-portal.tsx          # Login/register + gate
│   │   │   ├── writing-practice.tsx     # Gate login
│   │   │   ├── alphabet-chart.tsx       # Gate login
│   │   │   ├── syllable-chart.tsx       # Gate login
│   │   │   ├── practice.tsx
│   │   │   ├── badges.tsx
│   │   │   └── settings.tsx             # Akun + Logout
│   │   ├── games/              # 4 mini-games
│   │   │   ├── games-hub.tsx             # Gate di pilih game
│   │   │   ├── memory-game.tsx
│   │   │   ├── matching-game.tsx
│   │   │   └── spelling-game.tsx
│   │   ├── lesson/             # Lesson player + quiz
│   │   ├── pwa/                # PWA register + install prompt
│   │   └── ui/ + ui-custom/    # shadcn/ui + komponen kustom
│   └── lib/
│       ├── curriculum/         # Data kurikulum 6 level + stories
│       │   ├── level1.ts ... level5.ts
│       │   ├── level4-special.ts
│       │   └── stories.ts      # 10 cerita perpustakaan
│       ├── store.ts            # Zustand store (v4, multi-profil, devMode config)
│       ├── auth.ts             # Helper login (isLoggedIn, setAuthUser, logout)
│       ├── use-require-login.ts # Hook gate login
│       ├── tts.ts              # Text-to-Speech Indonesia
│       ├── sounds.ts           # Efek suara Web Audio
│       ├── game-scores.ts      # Skor game localStorage
│       └── word-of-day.ts      # Kata hari ini
├── scripts/
│   └── gen-icons.mjs           # Generate ikon PWA dari owl SVG
├── google-apps-script.js       # Backend login (deploy ke Google Sheets)
├── SETUP-GOOGLE-APPS-SCRIPT.md # Panduan setup login lengkap
├── Caddyfile                   # Gateway config
├── next.config.ts              # output: "export" (static)
└── package.json
```

---

## 🎨 Branding & Teknologi

### Branding

| Element | Value |
|---------|-------|
| **Nama** | Katakita |
| **Logo** | Owl (burung hantu) memegang buku — biru, oranye, kuning |
| **Warna Primer** | `#4E71FF` (biru) |
| **Warna Sekunder** | `#5409DA` (ungu) |
| **Background** | `#EEF5FF` (biru muda) |
| **Font** | System UI (sans-serif ramah anak) |

### Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Bahasa** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + shadcn/ui (New York) |
| **State** | Zustand (client) + persist (localStorage) |
| **Animasi** | Framer Motion |
| **Suara** | Web Speech API (TTS) + Web Audio API (efek) |
| **Ikon** | Lucide React |
| **Sertifikat** | html-to-image (export PNG) |
| **Database Login** | Google Sheets + Apps Script |
| **PWA** | manifest.json + service worker (cache-first aset, network-first navigasi) |

### Statistik Aplikasi

- **20+ screens** aplikasi
- **115+ pelajaran** dalam 6 level
- **10 cerita** di perpustakaan (3 tingkat kesulitan)
- **4 mini-games** + latihan bebas
- **22 badge achievements**
- **6 sertifikat** (1 per level, bisa diunduh PNG)
- **16 avatar** pilihan karakter anak
- **25 kata** rotasi "Kata Hari Ini"
- **8 tipe soal kuis** (acak 4 per pelajaran)

---

## ❓ FAQ & Troubleshooting

### Q: Bagaimana cara ganti URL Google Apps Script?

**A:** Edit file `config.js`, ubah `appsScriptUrl` dengan URL Web App Anda (akhiri dengan `/exec`). Simpan, selesai — tidak perlu rebuild.

### Q: Login gagal, padahal registrasi berhasil?

**A:** Pastikan Anda sudah **redeploy Apps Script** dengan kode terbaru dari `google-apps-script.js` (yang sudah fix case-insensitive email). Deploy → Manage deployments → Edit → New version → Deploy.

### Q: Tampilan berantakan saat di-upload ke GitHub Pages?

**A:** Static build sudah di-patch dengan relative paths (`./_next/...`), jadi berfungsi di subpath. Pastikan Anda upload **isi folder `out/`**, bukan folder `out/` itu sendiri.

### Q: Bagaimana mengaktifkan mode pengujian (semua level terbuka)?

**A:** Edit `config.js`, set `devMode: true`. Simpan, refresh aplikasi.

### Q: Tombol back di Android langsung exit, bukan kembali?

**A:** Sudah diperbaiki di versi 2.1. Back button sekarang kembali ke screen sebelumnya. Hanya exit saat di Home/Onboarding. Pastikan Anda pakai zip terbaru.

### Q: Bagaimana ganti link "dapatkan kode akses"?

**A:** Edit `config.js`, ubah `accessCodeUrl` dengan link Anda (wa.me, website, dll).

### Q: Bisakah dipakai offline?

**A:** Ya, setelah dibuka sekali, aplikasi ter-cache oleh service worker dan bisa dipakai offline. Untuk install di HP: buka di Chrome → menu → "Add to Home Screen".

### Q: Data user disimpan dimana?

**A:** Progress belajar & profil disimpan di localStorage browser. Data login disimpan di Google Sheets (via Apps Script). Tidak ada server khusus.

---

## 📜 Lisensi & Credits

### Lisensi

MIT License © QAF Studio

Aplikasi ini boleh digunakan, dimodifikasi, dan didistribusikan ulang secara gratis untuk tujuan edukasi.

### Credits

- **Developer**: QAF Studio
- **Metode**: Suku kata & fonik untuk bahasa Indonesia
- **Logo**: Owl mascot (CorelDRAW SVG)
- **Teknologi**: Next.js, React, Tailwind CSS, shadcn/ui, Framer Motion, Web Speech API, Web Audio API

---

## 📞 Kontak

- **Akses kode**: lynk.id/qafstudio (atau sesuaikan di config.js)
- **Versi**: KataKita 2.1 (beta)

---

> Dibuat dengan ❤️ untuk anak-anak Indonesia belajar membaca dengan menyenangkan.
