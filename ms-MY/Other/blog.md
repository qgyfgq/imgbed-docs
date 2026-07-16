# Blog

Fungsi blog menambah halaman blog tersendiri pada laman ImgHost anda.

Selepas diaktifkan, pelawat boleh membuka:

```text
https://your-domain.com/blog/
```

![Halaman utama blog](../../image/other/博客/博客首页.png)

Blog ini diadaptasi daripada projek sumber terbuka [LyraVoid/Mizuki](https://github.com/LyraVoid/Mizuki). ImgHost menulis semula dan mengintegrasikannya dengan Vue supaya ia boleh berjalan sebagai sebahagian daripada laman pengehosan imej.

## Tempat Mengkonfigurasikannya

Tetapan blog berada di bawah:

```text
System Settings -> Other Settings -> Blog
```

![Tetapan blog](../../image/other/博客/QQ20260611-221702.png)

## Persediaan Kali Pertama

1. Hidupkan `Enable`.
2. Pilih akaun GitHub yang digunakan untuk menyimpan konfigurasi blog.
3. Klik `Update Blog`.
4. Tunggu mesej kejayaan.
5. Buka `https://your-domain.com/blog/` untuk melihat blog.

Pada penggunaan pertama, ImgHost menyediakan repositori GitHub peribadi di bawah akaun yang dipilih:

```text
imgbed-blog-config
```

Repositori ini menyimpan tetapan blog dan kandungan artikel.

## Menulis Siaran

Edit siaran blog dalam repositori GitHub peribadi anda:

```text
imgbed-blog-config
```

Aliran kerja biasa:

1. Buka GitHub.
2. Masuk ke repositori peribadi `imgbed-blog-config`.
3. Edit atau tambah fail siaran.
4. Komit perubahan.
5. Kembali ke panel pentadbir ImgHost dan klik `Update Blog`, atau klik logo di penjuru kiri atas halaman utama blog sebanyak tiga kali untuk mencetuskan kemas kini blog.

`Update Blog` tidak menimpa kandungan yang telah anda tulis. Ia menyediakan repositori apabila diperlukan dan menyegarkan cache blog.

## Ciri Yang Disokong

Blog menyokong ciri blog umum seperti senarai siaran, kategori, tag, arkib, carian, mod gelap dan penukaran bahasa.

Ia juga menyokong komen dan statistik lawatan.

![Komen blog](../../image/other/博客/支持留言.png)

Komen muncul di bawah siaran. Pelawat boleh menghantar avatar, nama panggilan, e-mel dan kandungan komen.

Statistik lawatan menunjukkan paparan siaran dan lawatan laman, yang membantu anda memahami trafik blog.

## URL

Blog sentiasa disediakan di bawah `/blog/`.

Contohnya, jika domain ImgHost anda ialah:

```text
https://image.example.com
```

URL blog ialah:

```text
https://image.example.com/blog/
```

Selepas blog dinyahaktifkan, pelawat tidak lagi boleh mengakses halaman blog.
