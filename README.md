
# Elysian Fragrance — Static Website

Teknologi: **HTML + CSS + JavaScript** (tanpa framework) — cocok untuk GitHub Pages.

## Fitur
- Slider produk terlaris (maks 5) + gambar SVG elegan
- Tombol **Tambahkan ke Keranjang** (localStorage) & **Checkout** (WhatsApp intent)
- Alamat toko: *Jalan Bolak Balik No. 01, Bogor*
- Skema warna: **Gold, Hitam, Silver**
- Form **Kritik & Saran**
- **Testimoni pelanggan** + **Input testimoni** (tersimpan di localStorage)
- **Video Animasi Parfum** (SVG animasi ringan, ideal untuk hosting statis)
- Banyak varian dengan harga premium (dalam Rupiah)

## Cara Pakai (GitHub Pages)
1. Upload seluruh folder ke repo GitHub Anda (mis: `elysian-fragrance/`).
2. Aktifkan GitHub Pages (Branch: `main`, folder: `/root`). 
3. Buka halaman GitHub Pages yang dihasilkan.

## Ubah Nomor WhatsApp
Cari fungsi `checkout()` di `assets/js/app.js` lalu ganti `6281234567890` dengan nomor admin toko.

## Struktur Folder
```
elysian-fragrance/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  └─ app.js
│  ├─ svg/
│  │  ├─ perfume_1.svg … perfume_5.svg
│  └─ img/
└─ README.md
```

Selamat launching! ✨
