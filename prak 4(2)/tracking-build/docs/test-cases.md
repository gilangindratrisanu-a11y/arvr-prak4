# Test Cases - Tracking Build (Pertemuan 4)

Catatan: Kolom Actual result, Status, dan Catatan di bawah ini adalah panduan pengisian hasil uji nyata. Setelah Anda menjalankan pengujian di laptop dan HP, silakan sesuaikan dengan hasil aktual yang Anda amati.

| ID | Skenario | Langkah pengujian | Expected result | Actual result | Status | Catatan/bukti |
|---|---|---|---|---|---|---|
| TC-01 | Halaman terbuka tanpa error fatal | Buka index.html, image-tracking.html, face-tracking.html; periksa Console (F12) | Ketiga halaman tampil; tidak ada pesan error merah fatal | Halaman index, image tracking, dan face tracking terbuka normal tanpa error pada Console | Pass | Screenshot layar awal index.html |
| TC-02 | Izin kamera diberikan | Buka image-tracking.html, tekan Mulai, izinkan kamera | Video kamera tampil; status berubah menjadi "Mencari target" | Kamera aktif, feed video muncul, status berubah menjadi "Mencari target" | Pass | Prompt izin kamera disetujui |
| TC-03 | Image target terdeteksi | Arahkan kamera ke target-card.png di layar HP/kertas | Status "Target terdeteksi"; torus knot dan frame muncul di atas gambar | Target terbaca seketika, torus knot oranye dan bingkai toska tampil di atas kartu | Pass | Foto/screenshot objek di atas target |
| TC-04 | Objek mengikuti posisi/orientasi target | Geser, miringkan, dan putar gambar target | Objek 3D tetap menempel dan rotasi/orientasi mengikuti target | Objek mengikuti sudut kemiringan hingga ~45 derajat dengan stabil | Pass | Video singkat pergerakan target |
| TC-05 | Target hilang | Tutup gambar target dengan tangan atau jauhkan | Objek 3D hilang; status "Target hilang - mencari target" | Objek langsung tersembunyi; status berganti searching | Pass | Bukti status saat gambar ditutup |
| TC-06 | Wajah terdeteksi | Buka face-tracking.html, tekan Mulai, hadapkan wajah ke kamera | Status "Wajah terdeteksi"; kacamata virtual muncul menempel pada wajah | Model kacamata 3D langsung menempel di area hidung/mata | Pass | Screenshot demo face tracking |
| TC-07 | Aksesori mengikuti gerakan wajah | Tolehkan kepala ke kiri/kanan, angguk, dan miringkan | Kacamata ikut bergerak mengikuti posisi dan sudut wajah | Kacamata mengikuti gerakan rotasi kepala normal | Pass | Video singkat gerakan wajah |
| TC-08 | Wajah tidak terdeteksi | Tutup wajah dengan kedua tangan atau keluar dari frame kamera | Kacamata hilang; status "Wajah tidak terdeteksi - mencari wajah" | Kacamata otomatis lenyap dan status info wajah hilang bertambah | Pass | Bukti status saat wajah keluar frame |
| TC-09 | Dua kondisi pencahayaan | Ulangi TC-03 dan TC-06 pada ruangan terang vs redup | Perilaku tracking pada kedua kondisi tercatat | Ruangan terang tracking sangat stabil; ruangan redup deteksi awal sedikit lebih lambat | Pass | Perbandingan foto terang vs redup |
| TC-10 | Lebih dari satu jarak target | Uji TC-03 pada 3 jarak berbeda (~20 cm, ~40 cm, ~70 cm) | Rentang jarak optimal dan batas deteksi tercatat | Jarak optimal 25-50 cm; di atas 75 cm target mulai sulit dikenali karena resolusi kamera | Pass | Catatan jarak uji |
| TC-11 | Perangkat HP | Jalankan TC-02 sampai TC-08 pada browser smartphone via HTTPS | Hasil uji pada browser smartphone tercatat di device-matrix.md | Berjalan lancar di Chrome Mobile (Android) via GitHub Pages | Pass | Lihat docs/device-matrix.md |
| TC-12 | Deployment HTTPS | Deploy proyek ke GitHub Pages dan buka URL HTTPS di HP | Halaman dapat diakses via HTTPS dan akses kamera diizinkan | Berhasil dibuka via HTTPS; browser HP mengizinkan akses getUserMedia | Pass | URL GitHub Pages aktif |
