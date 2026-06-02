<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>📋 Dashboard Manajemen Kegiatan Kelompok</h1>
      <p class="sub-title">Sistem Sirkulasi Kontrol Proyek Mata Kuliah IPL</p>
    </header>

    <main class="dashboard-content">
      <section class="card form-section">
        <h3>➕ Tambah Agenda Kegiatan Baru</h3>
        <form @submit.prevent="tambahKegiatan" class="kegiatan-form">
          <div class="form-group">
            <label>Nama Kegiatan</label>
            <input v-model="form.nama_kegiatan" type="text" placeholder="Contoh: Integrasi Axios Frontend" required />
          </div>
          <div class="form-group">
            <label>Tanggal Pelaksanaan</label>
            <input v-model="form.tanggal" type="date" required />
          </div>
          <button type="submit" class="btn btn-primary">Simpan Agenda</button>
        </form>
      </section>

      <section class="card table-section">
        <h3>📊 Daftar Progres Kegiatan Kelompok</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kegiatan</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in daftarKegiatan" :key="item.id_kegiatan">
                <td>{{ index + 1 }}</td>
                <td>{{ item.nama_kegiatan }}</td>
                <td>{{ formatTanggal(item.tanggal) }}</td>
                <td>
                  <span :class="['badge', item.status === 'Selesai' ? 'badge-success' : 'badge-warning']">
                    {{ item.status }}
                  </span>
                </td>
                <td>
                  <button 
                    v-if="item.status !== 'Selesai'" 
                    @click="tandaiSelesai(item.id_kegiatan)" 
                    class="btn btn-success btn-sm">
                    ✔ Selesai
                  </button>
                  <span v-else class="text-muted">No Action</span>
                </td>
              </tr>
              <tr v-if="daftarKegiatan.length === 0">
                <td colspan="5" class="text-center">Belum ada agenda kegiatan tercatat.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      daftarKegiatan: [],
      form: {
        nama_kegiatan: '',
        tanggal: ''
      }
    };
  },
  mounted() {
    this.ambilDataKegiatan();
  },
  methods: {
    // Jalur GET API ke backend Express port 5000
    async ambilDataKegiatan() {
      try {
        const response = await axios.get('http://localhost:5000/api/sirkulasi');
        this.daftarKegiatan = response.data;
      } catch (error) {
        console.error('Gagal mengambil data dari server:', error);
      }
    },
    // Jalur POST API untuk tambah tugas
    async tambahKegiatan() {
      try {
        await axios.post('http://localhost:5000/api/sirkulasi', this.form);
        this.form.nama_kegiatan = '';
        this.form.tanggal = '';
        this.ambilDataKegiatan(); // Refresh tabel
        alert('Agenda kegiatan kelompok berhasil ditambahkan!');
      } catch (error) {
        console.error('Gagal menambahkan kegiatan:', error);
      }
    },
    // Jalur PUT API untuk update status tugas
    async tandaiSelesai(id) {
      try {
        await axios.put(`http://localhost:5000/api/sirkulasi/${id}`);
        this.ambilDataKegiatan(); // Refresh tabel
      } catch (error) {
        console.error('Gagal memperbarui status:', error);
      }
    },
    formatTanggal(stringTanggal) {
      if (!stringTanggal) return '-';
      const opsi = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(stringTanggal).toLocaleDateString('id-ID', opsi);
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}
.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
}
.sub-title {
  color: #666;
  font-size: 1.1rem;
}
.dashboard-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr 2fr;
  }
}
.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid #eef2f3;
}
h3 {
  margin-top: 0;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
  color: #2c3e50;
}
.kegiatan-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
label {
  font-weight: 600;
  font-size: 0.9rem;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.btn-primary { background: #3498db; color: white; }
.btn-primary:hover { background: #2980b9; }
.btn-success { background: #2ecc71; color: white; }
.btn-success:hover { background: #27ae60; }
.btn-sm { padding: 5px 10px; font-size: 0.85rem; }
.table-responsive { overflow-x: auto; }
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ebdada;
}
th { background-color: #f8f9fa; color: #333; }
.badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}
.badge-success { background: #e8f8f5; color: #2ecc71; }
.badge-warning { background: #fef9e7; color: #f1c40f; }
.text-muted { color: #aaa; font-size: 0.9rem; }
</style>