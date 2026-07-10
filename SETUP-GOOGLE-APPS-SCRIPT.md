# 🔐 Cara Menghubungkan Google Apps Script dengan Gate Login Katakita

Gate login Katakita menggunakan **Google Sheets + Google Apps Script** sebagai database gratis. Berikut panduan lengkap setup.

---

## 📋 Prasyarat

- Akun Google (Gmail)
- Akses ke Google Sheets & Apps Script (gratis)

---

## 🚀 Langkah 1: Buat Google Spreadsheet

1. Buka [https://sheets.google.com](https://sheets.google.com)
2. Klik **Blank** (Spreadsheet baru)
3. Beri nama spreadsheet: `Katakita Users`
4. Rename sheet pertama menjadi **`Users`** (klik kanan tab di bawah → Rename)
5. Buat header di **baris 1**:
   - **A1**: `Name`
   - **B1**: `Email`
   - **C1**: `Phone`
   - **D1**: `Password`
   - **E1**: `Token`
   - **F1**: `CreatedAt`

6. **Salin Spreadsheet ID** dari URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
                                          ^^^^^^^^^^^^^^^^^^^^^^
   ```
   Contoh: `1ABC123defGHI456jklMNO789pqrSTUvwxYZ`

---

## 🚀 Langkah 2: Deploy Google Apps Script

1. Di spreadsheet tadi, klik **Extensions → Apps Script**
2. Hapus semua kode default (`function myFunction() {}`)
3. Buka file `google-apps-script.js` dari folder Katakita
4. **Copy semua isi** dan **paste** ke editor Apps Script
5. Edit konfigurasi di bagian atas:
   ```javascript
   // Ganti dengan Spreadsheet ID Anda (Langkah 1)
   var SPREADSHEET_ID = "1ABC123defGHI456jklMNO789pqrSTUvwxYZ";

   // Ganti dengan kode akses 20 karakter yang Anda buat
   var VALID_ACCESS_CODES = [
     "KTK2024ABCD5678EFGH",  // Kode 1
     "QAFSTUDIO2024KTKXYZ",  // Kode 2
   ];
   ```
6. Klik **Save** (ikon disket) atau `Ctrl+S`

---

## 🚀 Langkah 3: Generate Kode Akses

Kode akses adalah 20 karakter alfanumerik yang user masukkan saat registrasi. Anda bisa:

**Opsi A: Buat manual** (20 karakter huruf besar + angka)
```
KTK2024ABCD5678EFGH
QAFSTUDIO2024KTKXYZ
KATAKITA1234567890AB
```

**Opsi B: Generate otomatis** di Apps Script:
```javascript
// Jalankan fungsi ini sekali untuk generate kode
function generateAccessCodes() {
  var codes = [];
  for (var i = 0; i < 10; i++) {
    var code = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var j = 0; j < 20; j++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    codes.push(code);
  }
  Logger.log(codes.join("\n"));
}
```
Klik **Run** → lihat output di **Execution log** → copy kode ke `VALID_ACCESS_CODES`.

**Distribusi kode akses ke user:** via lynk.id/qafstudio atau cara lain.

---

## 🚀 Langkah 4: Deploy sebagai Web App

1. Di Apps Script, klik **Deploy → New deployment**
2. Klik ikon roda gigi → pilih **Web app**
3. Isi:
   - **Description**: `Katakita Auth API`
   - **Execute as**: **Me** (akun Anda)
   - **Who has access**: **Anyone** (siapa saja bisa akses)
4. Klik **Deploy**
5. **Authorize access** saat diminta (klik Allow)
6. **Copy Web App URL** yang muncul:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## 🚀 Langkah 5: Hubungkan ke Aplikasi Katakita

### Untuk Versi Static (katakita-static-deploy.zip) — CARA TERMUDAH

**Tidak perlu rebuild!** Cukup edit file `config.js`:

1. Extract `katakita-static-deploy.zip`
2. Buka file **`config.js`** di text editor (Notepad, VS Code, dll)
3. Ganti `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` dengan URL Web App Anda:
   ```javascript
   window.KATAKITA_CONFIG = {
     appsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",
   };
   ```
4. Simpan file `config.js`
5. Selesai! Aplikasi otomatis pakai URL baru saat dibuka

**Keuntungan:**
- ✅ Tidak perlu install Node.js / build ulang
- ✅ Tidak perlu edit kode JavaScript yang minified
- ✅ Bisa ganti URL kapan saja dengan edit `config.js`
- ✅ URL tetap walau aplikasi di-redeploy

### Untuk Versi Development (source code)

Edit file `src/components/screens/auth-portal.tsx`, baris ~16:

```typescript
const APPS_SCRIPT_URL =
  (typeof window !== "undefined" && (window as any).KATAKITA_CONFIG?.appsScriptUrl) ||
  "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```

Atau set langsung di `public/config.js` (akan dipakai saat `bun run dev` atau `bun run build`).

**Atau** set via environment variable (buat file `.env.local`):
```
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
```

---

## 🧪 Langkah 6: Testing

### Test Registrasi
1. Buka aplikasi Katakita
2. Klik **Profil** (icon Users di header) → akan redirect ke Auth Portal
3. Klik **"Belum punya akun? Daftar"**
4. Isi: Nama, Email, Telepon, Password, Kode Akses
5. Klik **Daftar**
6. Cek spreadsheet → data user baru muncul di sheet `Users`

### Test Login
1. Setelah registrasi, login dengan email & password
2. Setelah login berhasil → otomatis kembali ke Profile Manager
3. Login tersimpan di localStorage — **tidak akan ditanya lagi** sampai logout

### Test Gate
- **Pelajaran 10 Level 1**: klik lesson 10 → jika belum login → Auth Portal muncul
- **Profile Manager**: klik Profil → jika belum login → Auth Portal muncul
- **Setelah login**: tidak ada gate dimanapun

---

## 🔧 Cara Kerja Gate Login

```
User klik Profil (atau Lesson 10 Lv 1)
        │
        ▼
  Cek isLoggedIn()
  (localStorage "katakita-auth")
        │
        ├── SUDAH LOGIN → lanjut ke Profile/Lesson (tanpa gate)
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
                                Redirect kembali ke
                                Profile/Lesson (sesuai returnUrl)
```

### Keuntungan Sistem Ini:
- ✅ **Gratis** — Google Sheets & Apps Script tidak bayar
- ✅ **Tanya sekali** — setelah login, tidak ditanya lagi
- ✅ **Persisten** — login tetap aktif walau browser ditutup
- ✅ **Multi-device** — user login di device berbeda dengan akun yang sama
- ✅ **Logout manual** — user bisa logout dari Settings

---

## 🛠️ Troubleshooting

### Error: "Gagal terhubung ke server" / "Gagal terhubung ke Google Apps Script"

**Penyebab paling umum: CORS preflight.** Browser kirim OPTIONS request sebelum POST (saat pakai `Content-Type: application/json`), tapi Google Apps Script tidak handle OPTIONS → gagal.

**Solusi (sudah diterapkan di kode):**
- Aplikasi pakai `Content-Type: text/plain` (bukan application/json) → no preflight
- Body tetap JSON string, Apps Script parse via `e.postData.contents`

**Jika masih gagal, cek:**

1. **URL benar di config.js** — harus akhiri dengan `/exec` (bukan `/dev`)
   ```javascript
   // ✓ BENAR
   appsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec"
   
   // ✗ SALAH (URL dev, hanya untuk testing di Apps Script editor)
   appsScriptUrl: "https://script.google.com/macros/s/AKfycb.../dev"
   ```

2. **Deployment setting benar:**
   - Execute as: **Me**
   - Who has access: **Anyone** (bukan "Anyone with Google account")

3. **Test URL langsung di browser** — buka URL Apps Script di tab baru:
   - Jika muncul JSON `{"status":"ok","message":"Katakita API berjalan..."}` → server OK
   - Jika error 403/404 → masalah deployment
   - Jika redirect ke Google login → set "Anyone" access

4. **Redeploy setelah edit Apps Script** — setiap ubah kode Apps Script, harus deploy ulang:
   - Deploy → Manage deployments → Edit (ikon pensil) → Version: New version → Deploy

### Test API tanpa aplikasi (debugging)

Buka URL ini langsung di browser (ganti URL dengan punya Anda):

```
https://script.google.com/macros/s/AKfycb.../exec
```

Harus muncul:
```json
{"status":"ok","message":"Katakita API berjalan. Gunakan POST untuk login/register."}
```

Test login via GET (untuk debug, password terlihat di URL):
```
https://script.google.com/macros/s/AKfycb.../exec?action=login&email=test@test.com&password=123456
```

### Error: "Kode akses tidak valid"
- Kode yang dimasukkan user tidak ada di `VALID_ACCESS_CODES`
- Generate kode baru atau periksa kode yang didistribusikan

### Error: "Format data tidak valid"
- Apps Script tidak bisa parse body
- Pastikan client kirim JSON string (bukan object)
- Cek `e.postData.contents` tidak undefined

### Data tidak muncul di Spreadsheet
- Cek `SPREADSHEET_ID` benar (dari URL sheet)
- Cek sheet bernama `Users` (case-sensitive, kapital U)
- Cek header baris 1: Name, Email, Phone, Password, Token, CreatedAt
- Cek Apps Script punya akses ke spreadsheet (authorize saat pertama run)

### Login berhasil tapi redirect salah
- Cek `returnUrl` di AppShell — setelah login harus kembali ke screen yang meminta login

### Data tersimpan tapi login gagal
- Cek password di spreadsheet — harus sama dengan yang user input
- Password disimpan plain text di sheet (untuk simplicity). Untuk production, hash dengan `Utilities.computeDigest()`

---

## 📞 Distribusi Kode Akses

Kode akses didistribusikan via:
- **lynk.id/qafstudio** — beli kode akses
- Email/wa langsung ke user yang sudah bayar
- Kartu fisik (print kode akses)

Setiap kode hanya bisa dipakai untuk 1 registrasi (opsional — bisa diatur di Apps Script).
