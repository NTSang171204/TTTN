
````markdown
# Knowledge Management System (KMS)

Dự án bao gồm 3 phần chính:
- **kms-server**: Backend API (Node.js + Express + PostgreSQL)
- **kms-admin**: Trang quản trị
- **kms-users**: Giao diện cho người dùng

---

## 1. Cài đặt dự án

### Bước 1: Clone source code
Tải project từ GitHub:
```bash
git clone https://github.com/NTSang171204/TTTN.git
````

Hoặc tải file `.zip` và giải nén.

---

### Bước 2: Cài đặt dependencies

Đi vào từng thư mục và chạy:

```bash
cd kms-server
npm install

cd ../kms-admin
npm install

cd ../kms-users
npm install
```

---

## 2. Cấu hình môi trường

### Bước 1: Tạo file `.env` trong thư mục `kms-server`

Tạo file `.env` với nội dung mẫu sau:

```env
# PostgreSQL
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# JWT
JWT_SECRET=
JWT_EXPIRES=

# App
PORT=

# HuggingFace AI
HF_TOKEN=
```

👉 Điền thông tin kết nối PostgreSQL, JWT, PORT, và HuggingFace token của bạn.

---

### Bước 2: Tạo Database PostgreSQL

Import database mẫu có sẵn trong repo vào PostgreSQL, hoặc tự tạo bằng:

```sql
CREATE DATABASE your_database_name;
```

---

## 3. Chạy dự án

Sau khi cài đặt xong, vào từng thư mục và chạy:

```bash
npm run dev
```

* **kms-server** sẽ khởi động API backend
* **kms-admin** sẽ chạy giao diện quản trị
* **kms-users** sẽ chạy giao diện người dùng

---

## 4. Ghi chú

* File `.env` không được commit lên GitHub (đã ignore trong `.gitignore`).
* Đảm bảo PostgreSQL đang chạy và thông tin `.env` khớp với cấu hình DB.

```

---

Bạn có muốn mình viết thêm **sơ đồ cấu trúc thư mục** (`kms-server`, `kms-admin`, `kms-users`) vào README để người khác dễ hình dung dự án không?
```
