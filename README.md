# 🕐 Attendance App — Frontend

> Aplikasi web absensi karyawan WFH berbasis React. Memungkinkan karyawan untuk melakukan absensi harian dengan bukti foto, serta memudahkan Admin HR dalam memantau dan mengelola data karyawan secara real-time.

---

## 📋 Daftar Isi

- [Instalasi](#-instalasi)
- [Gambaran Aplikasi](#-gambaran-aplikasi)
- [Tech Stack](#-tech-stack)
- [Fitur per Role](#-fitur-per-role)

---

## 🚀 Instalasi

**1. Clone repository**

```bash
git clone <repo-url>
cd attendance-app-fe
```

**2. Install dependencies**

```bash
npm install
```

**3. Konfigurasi environment**

Buat file `.env` di root project:

```env
# Sesuaikan dengan URL backend yang sedang berjalan
# Contoh: http://localhost:3000
VITE_API_URL=YOUR_API_URL
```

**4. Jalankan aplikasi**

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

---

## 🌟 Gambaran Aplikasi

Attendance App Frontend adalah antarmuka web yang terhubung dengan Attendance App Backend. Tersedia dalam dua mode tampilan berdasarkan peran pengguna — **Admin HR** mendapatkan akses penuh ke dashboard dan manajemen data, sementara **Employee** hanya dapat mengakses fitur absensi pribadi.

### Fitur Utama

- 🔐 **Autentikasi**
  - Login & Register dengan validasi form
  - Auto refresh token ketika sesi habis
  - Redirect otomatis berdasarkan role setelah login

- 📊 **Dashboard** *(Admin HR)*
  - Ringkasan total absensi, completed, dan active
  - Pie chart distribusi absensi berdasarkan status dan department
  - Filter periode: Today, This Week, This Month

- 👤 **Manajemen Karyawan** *(Admin HR)*
  - Tabel karyawan dengan pencarian dan filter department
  - Tambah, edit, dan hapus karyawan
  - Upload foto profil karyawan
  - Update password karyawan
  - Export data karyawan ke Excel

- 🏢 **Manajemen Department** *(Admin HR)*
  - Tabel department dengan pencarian
  - Tambah, edit, dan hapus department
  - Soft delete dengan indikator status Active/Inactive

- ✅ **Absensi** *(Semua Role)*
  - Check-in dengan upload foto bukti WFH
  - Check-out dengan upload foto
  - Riwayat absensi pribadi dengan filter tanggal
  - Status real-time: Active, Completed, Uncompleted

- 👁️ **Monitoring Absensi** *(Admin HR)*
  - Lihat absensi seluruh karyawan
  - Filter berdasarkan karyawan, department, dan rentang tanggal
  - Export data absensi ke Excel
  - Preview foto absensi langsung dari tabel

- 👤 **Profil**
  - Lihat detail profil akun sendiri
  - Update password

---

## 🛠 Tech Stack

| Teknologi | Keterangan |
|-----------|------------|
| **React 19** | Library utama UI |
| **TypeScript** | Type safety |
| **Vite** | Build tool |
| **MUI (Material UI)** | Komponen UI |
| **TanStack Query** | Data fetching & caching |
| **React Router DOM** | Routing |
| **React Hook Form** | Form management |
| **Zod** | Validasi schema |
| **Axios** | HTTP client |
| **dayjs** | Manipulasi tanggal |
| **ExcelJS** | Export Excel |
| **lodash** | Utility functions |

---

## ⚙️ Prasyarat

Pastikan **Attendance App Backend** sudah berjalan sebelum menjalankan frontend ini. Lihat README Backend untuk panduan instalasi.

- Attendance App Backend sudah running

---

## 👥 Fitur per Role

### Admin HR
| Halaman | Akses |
|---------|-------|
| Dashboard | ✅ |
| Attendance (pribadi) | ✅ |
| Employee Attendance (semua) | ✅ |
| Employee Management | ✅ |
| Department Management | ✅ |
| My Profile | ✅ |

### Employee
| Halaman | Akses |
|---------|-------|
| Attendance (pribadi) | ✅ |
| My Profile | ✅ |
| Dashboard | ❌ |
| Employee Management | ❌ |
| Department Management | ❌ |
| Employee Attendance | ❌ |

> Akses halaman yang tidak sesuai role akan otomatis diredirect ke halaman yang sesuai.

---

## 📁 Struktur Folder

```
src/
├── components/
│   ├── common/         # Komponen reusable (Modal, Table, Upload, dll)
│   ├── feedback/       # Loading, Error state
│   └── shared/         # Route guards (ProtectedRoute, GuestRoute, RoleRoute)
├── contexts/           # Global context (AuthContext, ToastContext)
├── layouts/            # AppLayout, AuthLayout
├── lib/                # Konfigurasi axios, queryClient, theme MUI
├── pages/
│   ├── auth/           # Login, Register
│   ├── dashboard/      # Dashboard Admin HR
│   ├── attendance/     # Halaman absensi karyawan
│   ├── employee/       # Manajemen karyawan
│   ├── employee-attendance/ # Monitoring absensi
│   ├── department/     # Manajemen department
│   └── detail-user/    # Profil pengguna
├── routes/             # Konfigurasi routing
├── services/           # Global services (upload, fetchUserMe)
├── types/              # Global TypeScript types
└── utils/              # Helper functions (formatter, guard, export)
```

---

## 🔗 Koneksi ke Backend

Semua request API diarahkan ke `VITE_API_URL` yang dikonfigurasi di `.env`. Pastikan:

- Backend sudah berjalan dan dapat diakses
- CORS sudah dikonfigurasi di backend untuk menerima request dari origin frontend
- Migrasi dan seeder backend sudah dijalankan agar data awal tersedia

---

<div align="center">
  <p>Made with ❤️ using React & MUI</p>
</div>