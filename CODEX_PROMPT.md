## 🎯 Prompt برای Codex (Backend PHP — Vashnia CRM)

> **هدف:** تولید کل بک‌اند سرویس CRM داخل همین ریپوزیتوری ‎**vashnia-crm**‎ بدون دست‌زدن به پوشهٔ فرانت فعلی. خروجی باید آماده‌ی اجرا روی هاست اشتراکی (cPanel + PHP 8.3 + MySQL) باشد.

### 1. ساختار پوشه‌ها

```
/backend
 ├─ app/
 │   ├─ Controllers/      (Auth, Category, Product, Order, Customer, Ticket …)
 │   ├─ Models/           (ORM ساده با PDO)
 │   ├─ Core/             (Router, Controller base, Database, Middleware)
 │   ├─ Middlewares/      (AuthMiddleware)
 │   └─ Helpers/
 ├─ config/
 │   └─ app.php           (read from .env)
 ├─ public/
 │   ├─ index.php
 │   └─ .htaccess
 ├─ database/
 │   ├─ migrations/       (SQL *.sql)
 │   └─ seeds/
 ├─ vendor/               (via composer)
 ├─ .env.example
 └─ composer.json
```

### 2. وابستگی‌ها (composer)

```json
{
  "require": {
    "vlucas/phpdotenv": "^5.6",
    "firebase/php-jwt": "^6.11",
    "phpoffice/phpspreadsheet": "^4.4"
  },
  "autoload": {
    "psr-4": {
      "App\\": "app/"
    }
  }
}
```

### 3. الزامات فنی

* **PHP >= 8.1** ؛ تمام type-hint‌ ها رعایت شود.
* اتصال DB از ‎`.env`‎ بخواند.
* همهٔ پاسخ‌ها ‎`application/json; charset=utf-8`‎ و ‎`JSON_UNESCAPED_UNICODE`‎ باشند.
* احراز هویت JWT (Bearer).
* Middleware برای CORS و Auth.
* خطاها با کد مناسب و بدنهٔ `{message}` برگردند.
* SQL migration برای جداول: `users, categories, products, orders, order_items, tickets`.
* Seeder اختیاری برای `admin` (mobile + password hashed).
* Upload/Import اکسل محصولات با PhpSpreadsheet.
* تست ساده `/api/ping` برگرداند `{"status":"ok"}`.

### 4. مسیرها (نمونه)

| متد  | آدرس            | کنترلر / اکشن             |
| ---- | --------------- | ------------------------- |
| POST | /api/login      | AuthController@login     |
| GET  | /api/categories | CategoryController@index |
| …    | …               | …                         |

### 5. تحویل

1. تمام فایل‌ها را در پوشهٔ ‎`/backend`‎ بساز.
2. هیچ فایل فرانت فعلی را تغییر نده.
3. در ریشه `README.md` بخش **Backend Setup** اضافه کن:

   ```bash
   cd backend
   composer install --no-dev --optimize-autoloader
   cp .env.example .env   # و ویرایش
   php -S localhost:5173 -t public
   ```
4. یک Pull Request با عنوان **feat: complete PHP backend** باز کن.

### 6. توجه

* از خروجی echo‌های ناخواسته، BOM و فضای اضافه اجتناب کن تا هِدِر JSON سالم بماند.
* بهینه‌‎سازی (PSR-12, strict_types=1).
* در پایان اجرای تلقی‌شده، هیچ `exit;` غیرضروری که Content-Length را صفر کند، قرار نده.
