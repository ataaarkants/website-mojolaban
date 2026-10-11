# Portal Desa Kecamatan Mojolaban — Tugas Sistem Terdistribusi (Kelompok 1)

Portal resmi Kecamatan Mojolaban + integrasi website **Desa Palur**, **Desa Plumbon**, dan **Desa Gadingan**, berjalan di localhost.

## Cara menjalankan
Syarat: Python 3 (`python --version`). Tidak perlu install library.

- Windows: klik dua kali `start.bat`
- Mac/Linux: `./start.sh` (atau `python3 server.py`)

Buka **http://localhost:8000**

| Halaman | Alamat |
|---|---|
| Portal Kecamatan Mojolaban | http://localhost:8000/ |
| Website Desa Palur | http://localhost:8000/desa/palur/ |
| Website Desa Plumbon | http://localhost:8000/desa/plumbon/ |
| Website Desa Gadingan | http://localhost:8000/desa/gadingan/ |

Ganti port: `python server.py 9000`. Berhenti: Ctrl+C.

## Menu Desa Gadingan (mengikuti Sondakan)
Home · Profil (Tentang, Sejarah, Visi Misi, Perangkat Desa, Lembaga) · Alamat & Kontak · Suara Warga · Rumah UMKM · Data Sektoral.
Layanan, Berita, Pengumuman, Galeri, dan Informasi Publik (PPID, Desa Anti Korupsi, APBDes) tampil di beranda dan footer.

## Mengisi Rumah UMKM
Edit `desa/gadingan/data/umkm.js` (ada contoh format di dalamnya). Foto taruh di `desa/gadingan/uploads/umkm/`.
Halaman Rumah UMKM dan beranda terisi otomatis. Kosongkan array untuk kembali ke tampilan "belum diisi".

## Mengganti warna
Semua warna ada di `:root` pada `desa/gadingan/assets/style.css`
(`--primary`, `--primary-dark`, `--accent`, dst.).

## Struktur
```
index.html                    landing page
server.py, start.bat/.sh      server lokal
desa/gadingan/index.html      website desa
desa/gadingan/assets/         app.js (tampilan & routing), style.css
desa/gadingan/data/           gadingan.js (data asli), umkm.js (diisi sendiri)
desa/gadingan/uploads/        foto dari website resmi desa
```

## Catatan data
- Sumber isi: arsip website gadingan-sukoharjo.desa.id (HTTrack). Penduduk/luas: BPS Kecamatan Mojolaban dalam Angka 2021.
- Banyak tabel Data Sektoral memang masih kosong di website resmi desa; ditampilkan sebagai daftar "belum diisi".
- Email, tautan Google Maps, dan foto kantor diambil dari poster "Layanan Informasi Pelayanan Desa" di website desa.
- Peta memakai Google Maps embed (butuh internet).
