/**
 * Katakita - Google Apps Script untuk Login & Register
 * Database: Google Sheets
 * 
 * CARA SETUP:
 * 1. Buka https://sheets.google.com, buat Spreadsheet baru
 * 2. Beri nama sheet pertama: "Users"
 * 3. Buat header di baris 1: A=Name, B=Email, C=Phone, D=Password, E=Token, F=CreatedAt
 * 4. Buka Extensions > Apps Script
 * 5. Hapus kode default, paste semua kode ini
 * 6. Ganti SPREADSHEET_ID dengan ID spreadsheet Anda (dari URL sheet)
 * 7. Deploy > New deployment > Type: Web app
 * 8. Execute as: Me, Who has access: Anyone
 * 9. Copy URL web app, paste di auth-portal.tsx (APPS_SCRIPT_URL)
 */

// === KONFIGURASI ===
var SPREADSHEET_ID = "PASTE_SPREADSHEET_ID_HERE";
var SHEET_NAME = "Users";

// Kode akses yang valid (20 karakter - generated)
// Ganti dengan kode yang Anda generate, atau generate otomatis
var VALID_ACCESS_CODES = [
  "KTK2024ABCD5678EFGH",  // Contoh - ganti dengan kode asli
  "QAFSTUDIO2024KTKXYZ",  // Contoh - ganti dengan kode asli
  // Tambahkan kode lain di sini, atau gunakan fungsi generateAccessCode()
];

/**
 * Generate kode akses 20 karakter (huruf + angka)
 * Jalankan fungsi ini sekali untuk mendapatkan kode, lalu tambahkan ke VALID_ACCESS_CODES
 */
function generateAccessCode() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var code = "";
  for (var i = 0; i < 20; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  Logger.log("Kode akses baru: " + code);
  return code;
}

/**
 * Handle POST requests (login & register)
 * Catatan: Google Apps Script TIDAK support CORS preflight (OPTIONS),
 * jadi client harus pakai Content-Type: text/plain (bukan application/json)
 * Body tetap JSON string, di-parse via e.postData.contents
 */
function doPost(e) {
  var data;
  try {
    // e.postData.contents berisi raw body (JSON string dari client)
    var rawBody = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    data = JSON.parse(rawBody);
  } catch (err) {
    return jsonResponse({ success: false, message: "Format data tidak valid: " + err.message });
  }

  var action = data.action;
  var result;
  if (action === "register") {
    result = handleRegister(data);
  } else if (action === "login") {
    result = handleLogin(data);
  } else {
    result = { success: false, message: "Aksi tidak dikenal: " + action };
  }

  return jsonResponse(result);
}

/**
 * Handle GET requests (untuk testing & debugging)
 * Bisa akses langsung di browser: URL?token=test
 */
function doGet(e) {
  // Jika ada parameter action, handle sebagai API call (untuk testing tanpa CORS issue)
  if (e && e.parameter && e.parameter.action) {
    var data = e.parameter;
    var result;
    if (data.action === "login") {
      result = handleLogin(data);
    } else if (data.action === "register") {
      result = handleRegister(data);
    } else {
      result = { success: false, message: "Aksi tidak dikenal" };
    }
    return jsonResponse(result);
  }
  // Default: status check
  return jsonResponse({ status: "ok", message: "Katakita API berjalan. Gunakan POST untuk login/register." });
}

/**
 * Helper: return JSON response dengan CORS-friendly headers
 * Google Apps Script otomatis set Access-Control-Allow-Origin: * untuk Web App
 * yang di-deploy dengan "Anyone" access.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Register user baru
 */
function handleRegister(data) {
  var name = (data.name || "").toString().trim();
  var email = (data.email || "").toString().trim().toLowerCase();
  var phone = (data.phone || "").toString().trim();
  var password = (data.password || "").toString();
  var accessCode = (data.accessCode || "").toString().trim();

  // Validasi
  if (!name || !email || !phone || !password || !accessCode) {
    return { success: false, message: "Semua kolom wajib diisi" };
  }

  // Validasi format email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Format email tidak valid" };
  }

  // Cek kode akses
  if (VALID_ACCESS_CODES.indexOf(accessCode) === -1) {
    return { success: false, message: "Kode akses tidak valid" };
  }

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  var lastRow = sheet.getLastRow();

  // Cek apakah email sudah terdaftar (case-insensitive)
  if (lastRow >= 2) {
    var emailRange = sheet.getRange(2, 2, lastRow - 1, 1).getValues(); // kolom B (email)
    for (var i = 0; i < emailRange.length; i++) {
      var storedEmail = (emailRange[i][0] || "").toString().trim().toLowerCase();
      if (storedEmail === email) {
        return { success: false, message: "Email sudah terdaftar. Silakan login." };
      }
    }
  }

  // Generate token
  var token = Utilities.getUuid();

  // Tambah user baru: Name, Email, Phone, Password, Token, CreatedAt
  sheet.appendRow([name, email, phone, password, token, new Date().toISOString()]);

  return { success: true, message: "Registrasi berhasil", token: token };
}

/**
 * Login user
 */
function handleLogin(data) {
  var email = (data.email || "").toString().trim().toLowerCase();
  var password = (data.password || "").toString();

  if (!email || !password) {
    return { success: false, message: "Email dan password wajib diisi" };
  }

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  var lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return { success: false, message: "Email atau password salah (belum ada user terdaftar)" };
  }

  // Ambil semua data user: A=Name, B=Email, C=Phone, D=Password, E=Token
  var dataRange = sheet.getRange(2, 1, lastRow - 1, 5).getValues();

  for (var i = 0; i < dataRange.length; i++) {
    var storedName = (dataRange[i][0] || "").toString();
    var storedEmail = (dataRange[i][1] || "").toString().trim().toLowerCase();
    var storedPhone = (dataRange[i][2] || "").toString();
    var storedPassword = (dataRange[i][3] || "").toString();
    var storedToken = (dataRange[i][4] || "").toString();

    // Case-insensitive email, exact password
    if (storedEmail === email && storedPassword === password) {
      return {
        success: true,
        name: storedName,
        email: storedEmail,
        phone: storedPhone,
        token: storedToken,
        message: "Login berhasil"
      };
    }
  }

  return { success: false, message: "Email atau password salah. Cek kembali email dan password Anda." };
}

/**
 * Fungsi untuk menambah kode akses baru ke sheet
 * Buat sheet kedua bernama "AccessCodes" dengan kolom A=Code, B=Used, C=CreatedAt
 */
function addAccessCode(code) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName("AccessCodes");
  if (!sheet) {
    sheet = ss.insertSheet("AccessCodes");
    sheet.appendRow(["Code", "Used", "CreatedAt"]);
  }
  sheet.appendRow([code, "No", new Date().toISOString()]);
}

/**
 * Generate 10 kode akses sekaligus
 */
function generateMultipleAccessCodes() {
  for (var i = 0; i < 10; i++) {
    var code = generateAccessCode();
    addAccessCode(code);
    Logger.log("Kode " + (i + 1) + ": " + code);
  }
}
