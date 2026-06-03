const mysql = require('mysql2');
require('dotenv').config();

// Ubah createConnection menjadi createPool agar koneksi otomatis menjaga diri (auto-reconnect)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Tes koneksi awal saat server baru menyala
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Gagal koneksi ke database:', err.message);
        return;
    }
    console.log('🚀 Koneksi database MySQL menggunakan Pool berhasil!');
    connection.release(); // Kembalikan koneksi ke pool setelah dites
});

module.exports = db;