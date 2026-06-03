const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306 // 👈 Tambahkan baris ini agar membaca port Railway publik (40550)
});

db.connect((err) => {
    if (err) {
        console.error('❌ Gagal koneksi ke database:', err.message);
        return;
    }
    console.log('🚀 Koneksi database MySQL berhasil!');
});

module.exports = db;