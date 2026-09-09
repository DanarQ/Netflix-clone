# Architecture Documentation: Myflix (Netflix Clone)

Dokumen ini menjelaskan arsitektur sistem, struktur direktori, alur data, dan konvensi pengembangan aplikasi **Myflix** untuk referensi pengembang dan agen AI.

---

## 1. Tech Stack Overview

* **Runtime & Package Manager**: [Bun](https://bun.sh/)
* **UI Framework**: React 19 (`react`, `react-dom` v19 dalam `StrictMode`)
* **Routing**: React Router v8 (`react-router` 8.3.1) dengan browser View Transitions API
* **Styling**: Tailwind CSS v4 (`@import "tailwindcss";` via `bun-plugin-tailwind`) + Modular Scoped CSS
* **Typography**: Bebas Neue (Hero & Brand), Helvetica Neue / Sans-Serif (Body & UI)
* **Build System**: `Bun.build` (`build.ts`) dengan target browser modern

---

## 2. Struktur Direktori & Tanggung Jawab

```text
Netflix-clone/
├── AGENTS.md                 # Dokumentasi arsitektur (file ini)
├── build.ts                  # Script bundle produksi menggunakan Bun.build
├── package.json              # Konfigurasi dependensi & scripts
├── tsconfig.json             # Konfigurasi TypeScript (alias path: @/* -> ./src/*)
└── src/
    ├── index.ts              # Server HTTP Bun (pengembang / mock API)
    ├── index.html            # Template HTML utama (#root)
    ├── frontend.tsx          # Client entrypoint & bootstrap React DOM + HMR
    ├── App.tsx               # Route orchestrator & global PiP/scroll state
    │
    ├── pages/                # Komponen level Halaman (terhubung langsung ke Route)
    │   ├── HomePage.tsx          # Halaman beranda: Hero, baris katalog, footer
    │   ├── WatchPage.tsx         # Pemutar video layar penuh & kontrol kustom
    │   ├── ManageProfilesPage.tsx# Pemilihan & manajemen multi-profil
    │   ├── HelpCenterPage.tsx    # Pusat bantuan interaktif dengan pencarian artikel
    │   └── account/              # Sub-halaman area Akun Pengguna
    │       ├── AccountPage.tsx       # Layout utama akun (header & sidebar)
    │       ├── AccountOverview.tsx   # Ringkasan keanggotaan & tautan cepat
    │       ├── AccountProfiles.tsx   # Pengaturan preferensi profil pengguna
    │       └── MembershipView.tsx    # Ganti paket demo & simulasi langganan
    │
    ├── components/           # Komponen UI Reusable (Widgets & Parsial)
    │   ├── Navbar.tsx            # Bar navigasi sticky (desktop & mobile menu)
    │   ├── MyflixLogo.tsx        # Vektor SVG logo brand Myflix
    │   ├── ProfileFace.tsx       # Vektor SVG avatar profil dinamis + badge kids
    │   ├── AccountIcon.tsx       # Ikon SVG modular untuk navigasi akun
    │   ├── MovieRow.tsx          # Baris carousel katalog film dengan scroll-snap
    │   ├── MovieDetailModal.tsx  # Pop-up dialog (<dialog>) detail tontonan
    │   └── MiniPlayer.tsx        # Floating Picture-in-Picture player melayang
    │
    ├── data/                 # Data Statis & Layer Penyimpanan
    │   ├── movies.ts             # Model data Movie & mock katalog film/series
    │   ├── profiles.ts           # Model data Profile, nilai bawaan, & helper storage
    │   └── helpTopics.ts         # Data artikel FAQ & kategori Help Center
    │
    └── styles/               # File CSS Modular & Global
        ├── index.css             # Tailwind base layer, reset global, style navbar
        ├── home.css              # Style hero, catalog, movie cards, & video player
        ├── account.css           # Style tema terang untuk halaman akun & paket
        └── help.css              # Style pusat bantuan, search bar, & akordeon FAQ
```

---

## 3. Peta Rute (Routing Table)

Aplikasi menggunakan `react-router` berbasis `BrowserRouter` di [`src/frontend.tsx`](file:///d:/Pemrograman/WebDev/Netflix-clone/src/frontend.tsx) dan dipetakan di [`src/App.tsx`](file:///d:/Pemrograman/WebDev/Netflix-clone/src/App.tsx):

| Rute URL | Komponen Halaman | Deskripsi |
| :--- | :--- | :--- |
| `/` | `HomePage` | Menampilkan Navbar, Hero banner unggulan, baris katalog film, modal detail film, dan floating `MiniPlayer` (jika aktif). |
| `/watch/:movieId` | `WatchPage` | Pemutar video HTML5 kustom layar penuh. Dapat diperkecil (*minimize*) menjadi `MiniPlayer` di `HomePage`. |
| `/manage-profiles` | `ManageProfilesPage` | Antarmuka pemilihan profil (*"Who's watching?"*) atau pengelolaan profil (*"Manage Profiles"* via mode toggle atau query `?mode=select`). |
| `/account` | `AccountPage` -> `AccountOverview` | Halaman ringkasan status keanggotaan demo dan quick links. |
| `/account/membership` | `AccountPage` -> `MembershipView` | Pemilihan paket (Basic, Standard, Premium) dan simulasi pembatalan/restart. |
| `/account/profiles` | `AccountPage` -> `AccountProfiles` | Daftar profil akun pengguna untuk diedit. |
| `/account/profiles/:profileId` | `AccountPage` -> `AccountProfiles` | Edit nama dan preferensi profil spesifik. |
| `/help` | `HelpCenterPage` | Pusat bantuan interaktif dengan pencarian teks artikel, filter kategori, dan collapsible FAQ. |
| `*` | `<Navigate to="/" replace />` | Fallback wildcard redirect ke beranda. |

---

## 4. Alur Data & State Persistence

Aplikasi bersifat *client-first* dengan persistensi berbasis browser storage yang dilengkapi *error handling defensive* (`try...catch` fallback ke memory):

1. **Profil Pengguna**:
   * `myflix-profiles` (`localStorage`): Menyimpan array `Profile[]` (maksimal 5 profil).
   * `myflix-active-profile` (`localStorage`): Menyimpan `profile.id` yang saat ini aktif digunakan untuk browsing dan dipajang di Navbar.
2. **Daftar Favorit (My List)**:
   * `myflix-my-list` (`localStorage`): Menyimpan array ID film `string[]` yang ditandai oleh pengguna.
3. **Keanggotaan Demo (Membership)**:
   * `myflix-demo-membership` (`localStorage`): Menyimpan `{ plan: "Basic" | "Standard" | "Premium", cancelled: boolean }`.
4. **Scroll Restoration Antara Beranda & Pemutar Video**:
   * `myflix-catalog-scroll` (`sessionStorage`): Saat pengguna memutar film dari katalog, posisi scroll Y disimpan. Saat kembali atau meminimalkan pemutar, posisi scroll dipulihkan seketika via `requestAnimationFrame` tanpa melompat ke atas.

---

## 5. Prinsip Desain & Konvensi

1. **Pemisahan Komponen vs Halaman**:
   * `src/pages/` hanya menampung komponen yang merespons suatu rute langsung dan mengatur layout halaman.
   * `src/components/` murni komponen independen yang menerima props (presentational / UI widgets).
2. **Aksesibilitas (A11y)**:
   * Menggunakan tag semantik HTML5 (`<main>`, `<section>`, `<aside>`, `<dialog>`, `<details>`, `<summary>`).
   * Selalu menyertakan atribut ARIA (`aria-label`, `aria-labelledby`, `aria-pressed`, `aria-expanded`, `role="status"`, `role="alert"`).
   * Dilengkapi *Skip Link* (`.skip-link`) untuk navigasi pembaca layar.
   * Menghargai preferensi pengguna terhadap animasi melalui `@media (prefers-reduced-motion: reduce)`.
3. **Performa & Animasi**:
   * Navigasi antar-halaman mendukung `viewTransition: true` dari React Router untuk transisi halus antar-state (seperti katalog ke video player).
   * Gambar poster menggunakan `loading="lazy"`, sedangkan gambar hero banner utama menggunakan `fetchPriority="high"`.

---

## 6. Perintah Eksekusi Proyek

```bash
# Menjalankan server development dengan Hot Module Replacement (HMR)
bun run dev

# Menjalankan kompilasi produksi ke folder /dist
bun run build

# Menjalankan server dalam mode produksi
bun run start
```

