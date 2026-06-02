const express = require('express');
const router = express.Router();
const sirkulasiController = require('../controllers/sirkulasiController');

// Jalur API
router.get('/', sirkulasiController.getAllKegiatan);
router.post('/', sirkulasiController.addKegiatan);
router.put('/:id', sirkulasiController.updateStatusKegiatan);

module.exports = router;