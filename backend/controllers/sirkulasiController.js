const db = require('../config/db');

// Ambil semua data kegiatan
exports.getAllKegiatan = (req, res) => {
    db.query('SELECT * FROM kegiatan ORDER BY tanggal DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Tambah kegiatan baru (Fungsi Tombol Simpan)
exports.addKegiatan = (req, res) => {
    const { nama_kegiatan, tanggal } = req.body;
    db.query('INSERT INTO kegiatan (nama_kegiatan, tanggal) VALUES (?, ?)', 
    [nama_kegiatan, tanggal], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Kegiatan berhasil ditambahkan!', id: result.insertId });
    });
};

// Update status jadi Selesai
exports.updateStatusKegiatan = (req, res) => {
    const { id } = req.params;
    db.query("UPDATE kegiatan SET status = 'Selesai' WHERE id_kegiatan = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Status kegiatan berhasil diperbarui!' });
    });
};