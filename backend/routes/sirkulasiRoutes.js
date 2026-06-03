const express = require('express');
const router = express.Router();
const db = require('../db'); // Jalur mundur satu folder untuk memanggil file db.js kamu

// ==========================================
// 1. GET: Ambil Semua Data Sirkulasi Kegiatan
// ==========================================
router.get('/', (req, res) => {
    // Sesuaikan 'kegiatan' dengan nama tabel di database Railway kamu
    const sql = 'SELECT * FROM kegiatan'; 

    // Langsung tembak query, Pool akan otomatis mengelola buka/tutup koneksi
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Gagal mengambil data sirkulasi:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ==========================================
// 2. POST: Tambah Data Sirkulasi Baru
// ==========================================
router.post('/', (req, res) => {
    // Sesuaikan properti di dalam req.body dengan kolom formulir frontend kamu
    const { nama_kegiatan, tanggal, deskripsi } = req.body; 
    const sql = 'INSERT INTO kegiatan (nama_kegiatan, tanggal, deskripsi) VALUES (?, ?, ?)';

    db.query(sql, [nama_kegiatan, tanggal, deskripsi], (err, result) => {
        if (err) {
            console.error('❌ Gagal menambah data sirkulasi:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: '🎉 Data sirkulasi berhasil ditambahkan!', 
            id: result.insertId 
        });
    });
});

module.exports = router;