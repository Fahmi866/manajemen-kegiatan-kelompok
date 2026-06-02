const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sirkulasiRoutes = require('./routes/sirkulasiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routing API
app.use('/api/sirkulasi', sirkulasiRoutes);

app.listen(PORT, () => {
    console.log(`📡 Server Express aktif di port: ${PORT}`);
});