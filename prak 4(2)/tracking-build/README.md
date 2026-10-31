# Tracking Build - MindAR & Three.js (Pertemuan 4)

Proyek ini adalah implementasi praktikum Augmented Reality menggunakan pustaka **MindAR v1.2.5** dan **Three.js v0.160.0**.

## Identitas
- **Nama**: Gilang Indra Trisanu
- **NIM**: 2409020076
- **URL GitHub Pages**: [Isi URL GitHub Pages Anda]

## Fitur
1. **Demo 1: Image Tracking**
   - Melacak target gambar (`target-card.mind`).
   - Menampilkan objek 3D (Torus Knot) dan bingkai di atas target.
   - Menangani event `onTargetFound` dan `onTargetLost`.
2. **Demo 2: Face Tracking**
   - Melacak wajah pengguna menggunakan model neural network (CDN).
   - Menampilkan kacamata virtual 3D pada titik landmark 168 (antara mata).
   - Menampilkan status deteksi wajah secara real-time.

## Cara Menjalankan secara Lokal
1. Buka folder `tracking-build` di VS Code.
2. Gunakan ekstensi **Live Server** atau jalankan perintah berikut di terminal:
   ```bash
   python -m http.server 8080
   ```
3. Buka browser dan akses `http://localhost:8080`.
4. Pilih menu demo yang diinginkan dan tekan tombol **Mulai**.

## Hasil Pengujian & Dokumentasi
- Laporan pengujian lengkap dapat dilihat di [docs/test-cases.md](./docs/test-cases.md).
- Matriks dukungan perangkat dapat dilihat di [docs/device-matrix.md](./docs/device-matrix.md).

## Masalah dan Investigasi
1. **Kendala**: Objek 3D pada face tracking awalnya tampak gelap gulita.
   - **Investigasi**: Kode menggunakan `MeshStandardMaterial` yang membutuhkan sumber cahaya.
   - **Perbaikan**: Menambahkan `HemisphereLight` dan `DirectionalLight` ke dalam scene.
2. **Kendala**: Face tracking gagal memuat di jaringan tertentu.
   - **Investigasi**: MindAR mengunduh model dari Google Storage dan JSDelivr. Jika diblokir, tracking tidak akan mulai.
   - **Solusi**: Menggunakan koneksi internet yang lebih stabil dan memastikan domain tersebut tidak diblokir.

## Keterbatasan
- Image tracking sangat bergantung pada kontras dan detail gambar target.
- Face tracking membutuhkan koneksi internet untuk mengunduh model saat pertama kali dijalankan.
- Tidak mendukung spatial mapping lingkungan secara luas (hanya berbasis target/wajah).
