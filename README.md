# 🎬 CINERA — Live Movie Streaming & Admin Control Platform

<p align="center">
  <img src="https://img.shields.io/badge/.NET-10.0-blueviolet?style=for-the-badge&logo=.net" alt=".NET 10.0" />
  <img src="https://img.shields.io/badge/React-2026-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/SQL--Server-2022-red?style=for-the-badge&logo=microsoft-sql-server" alt="SQL Server" />
  <img src="https://img.shields.io/badge/JWT-Secure-orange?style=for-the-badge" alt="JWT Secure" />
</p>

---

## 📝 وصف المشروع (Project Overview)
**CINERA** هي منصة سينمائية متكاملة لربط واجهات الـ Frontend التفاعلية بخدمات الـ Backend الحية وقاعدة بيانات **Microsoft SQL Server**. يوفر المشروع نظام حماية متكامل لتسجيل المستخدمين، التحقق الثنائي عبر البريد الإلكتروني الفعلي، إدارة الحسابات والتعليقات، وقائمة المشاهدة الشخصية، بالإضافة إلى لوحة تحكم إدارية كاملة (Admin Dashboard) لإدارة المحتوى.

تم تصميم الكود البرمجي ليعمل بسلاسة فائقة ودون إحداث أي تغيير على التصميم أو الستايل الأصلي لواجهات الموقع إطلاقاً.

---

## ✨ المميزات الرئيسية (Core Features)

### 🔒 نظام الحسابات والمصادقة (Authentication & Authorization)
- **التسجيل الذكي على خطوتين**: إدخال البيانات الأساسية أولاً، ثم المطالبة برمز التحقق (Verification Code).
- **التحقق من البريد الإلكتروني الحقيقي**: إرسال كود تحقق حركي مكون من 6 أرقام للبريد المسجّل بصلاحية 15 دقيقة، وفي نفس الوقت إخطار الإدارة بالتسجيل على إيميلها الخاص.
- **تأمين البيانات بـ JWT**: تشفير الجلسات وإصدار توكن JWT وتخزينه لحماية مسارات الملف الشخصي ولوحة الإدارة.
- **تشفير كلمات المرور**: استخدام خوارزمية PBKDF2 المدمجة الآمنة لعمل التشفير والمقارنة (Password Hashing).

### 📊 لوحة تحكم المدير (Admin Control Panel)
- **إحصائيات حية**: عرض العدد الإجمالي للمستخدمين، الأفلام، والتعليقات المكتوبة مباشرة من قاعدة البيانات.
- **إدارة المحتوى (CRUD)**: إمكانية جلب وإضافة وحذف الأفلام، حسابات المستخدمين، والمراجعات بشكل نهائي من قاعدة البيانات.
- **تجميع التصنيفات (Dynamic Genres)**: تجميع وتحديث تصنيفات الأفلام (Genres) وإحصائياتها ديناميكياً بحسب الأفلام المتوفرة في قاعدة البيانات.

### 👤 بروفايل المستخدم (User Profile)
- جلب وعرض بيانات المستخدم المسجل، وحالة التحقق من حسابه، وعدد الأفلام الموجودة في قائمة المشاهدة (Watchlist) الخاصة به حياً من قاعدة البيانات.

---

## 📂 الهيكل المجلد للمشروع (Project Structure)

```text
CINERA/
│
├── CINERA.csproj                # ملف إعدادات مشروع الـ Backend ومكتبات NuGet
├── Program.cs                   # إعدادات حقن الاعتماديات، الـ JWT، الـ CORS، وتشغيل الـ API
├── appsettings.json             # ملف الإعدادات العام (سلسلة الاتصال وبيانات الـ SMTP)
│
├── Data/
│   ├── AppDbContext.cs          # سياق الاتصال بقاعدة البيانات وجداول SQL Server
│   └── DbInitializer.cs         # بذر البيانات الافتراضية (18 فيلماً وحساب المدير)
│
├── Models/                      # النماذج البرمجية الخاصة بقاعدة البيانات والـ DTOs
│   ├── User.cs, Movie.cs, Review.cs, WatchlistItem.cs
│   └── Dtos/                    # نماذج نقل البيانات بين العميل والخادم (Register, Login, Verify, Stats)
│
├── Controllers/                 # نقاط النهاية (Endpoints) الخاصة بالـ API
│   ├── AuthController.cs        # مسارات التوثيق والبروفايل والتفعيل
│   └── AdminController.cs       # مسارات لوحة التحكم الإدارية
│
├── Services/                    # الخدمات المساعدة
│   ├── IEmailService.cs         # واجهة إرسال البريد
│   └── EmailService.cs          # تطبيق إرسال البريد الحقيقي عبر SMTP
│
└── CINERA.Frontend/             # مجلد واجهة المستخدم (React App)
    ├── src/
    │   ├── services/            # إدارة اتصالات Axios والـ APIs مع الـ Backend
    │   │   ├── api.js           # الإعداد العام للـ Axios والتوكن
    │   │   ├── auth.js          # خدمات المصادقة والتفعيل
    │   │   └── admin.js         # خدمات لوحة الإدارة
    │   └── pages/               # واجهات الاستخدام (تضمين الربط الحركي مع الحفاظ على التصميم)
```

---

## 🛠️ متطلبات التشغيل (System Prerequisites)
تأكد من تنصيب الأدوات التالية على نظامك قبل البدء:
* **SDK .NET 10.0** أو أحدث.
* **Node.js** (إصدار LTS المستقر).
* **Microsoft SQL Server** (أو خادم SQL Server Express / LocalDB).

---

## 🚀 خطوات التثبيت والتشغيل بالتفصيل (Detailed Setup Guide)

### 1️⃣ إعداد وتشغيل الخلفية البرمجية (Backend Web API)

1. افتح مشروع الـ Backend الرئيسي `CINERA` باستخدام **Visual Studio 2022**.
2. افتح ملف `appsettings.json` وقم بتهيئة سلسلة الاتصال كالتالي:
   ```json
   "ConnectionStrings": {
     "Default": "Server=.;Database=CineraDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true;"
   }
   ```
3. قم بعمل **Build** للحل.
4. اضغط على زر **Start / Run** في Visual Studio. 
   - سيعمل الـ API على المنفذ المخصص `https://localhost:44309`.
   - سيقوم الـ API تلقائياً بإنشاء قاعدة البيانات `CineraDb` وبناء الجداول بداخلها وبذر 18 فيلماً افتراضياً وحساب المدير عند أول إقلاع للمشروع.

---

### 2️⃣ إعداد وتشغيل الواجهة الأمامية (React Frontend)

1. افتح نافذة Terminal أو سطر الأوامر وانتقل لمجلد الـ Frontend:
   ```powershell
   cd CINERA.Frontend
   ```
2. قم بتثبيت حزم المجلد والاعتماديات:
   ```powershell
   npm install
   ```
3. ابدأ تشغيل واجهة React:
   ```powershell
   npm start
   ```
4. سيفتح المتصفح تلقائياً على الرابط: `http://localhost:3000`.

---

## 🔑 حسابات التجربة والاختبار (Testing Credentials)

### 🛡️ حساب المدير الافتراضي (Admin Account)
يستخدم للولوج الكامل للوحة الإدارة لمشاهدة الإحصائيات وإدارة قاعدة البيانات:
* **البريد الإلكتروني**: `admin@cinera.com`
* **كلمة المرور**: `admin123`

---

## 🎬 خاتمة (Conclusion)

تم بناء منصة **CINERA** كنموذج تطبيقي عملي متطور يجمع بين كفاءة وأداء بيئة عمل **.NET 10.0** ومرونة وسرعة مكتبة **React.js**. يمثل هذا المشروع تجربة مستخدم آمنة ومحمية بالكامل، تضمن لمديري النظام سهولة المتابعة والتحكم في المحتوى الترفيهي مع الحفاظ على سرعة واستقرار الاتصال بقاعدة البيانات. 

نتمنى لك تجربة ممتعة في تصفح وتطوير المنصة! 🚀
