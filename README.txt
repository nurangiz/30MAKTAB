# 30-MAKTAB — tayyor sayt

## Fayllar
- `index.html` — barcha sahifalar/menyular
- `styles.css` — zamonaviy responsive dizayn
- `app.js` — jadval, real vaqt, qo‘ng‘iroq, audio, YouTube, reyting, izohlar, AI demo
- `assets/` — siz yuborgan 30-maktab rasmlari

## VS Code'da ishga tushirish
1. Papkani VS Code'da oching.
2. `index.html`ni Live Server orqali oching.
3. Yoki `index.html`ni brauzerda to‘g‘ridan-to‘g‘ri oching.

## O‘zingiz o‘zgartiradigan joylar
`app.js` faylining boshida:
- `SOCIAL_LINKS` — Instagram, Telegram, YouTube
- `SCHOOL_INFO.mapUrl` — aniq Google Maps manzili
- `TEACHERS` — 50 ta ustoz ismi/fani/rasmi
- `STUDENTS` — 50 ta o‘quvchi
- `ACHIEVEMENTS` — maktab yutuqlari
- `ABOUT_ITEMS` — 5 ta maktab haqida blok

## 3x4 rasm
Rasmni `assets` papkasiga qo‘ying va masalan:
`image: "assets/ustoz-01.jpg"`
deb yozing.

## Audio
Saytda foydalanuvchi MP3/WAV fayl tanlaydi:
- Madhiya
- Maktab qo‘ng‘irog‘i

Muhim: Chrome/Edge kabi brauzerlar autoplayni cheklaydi. Shu sabab “Ovozlarni yoqish” tugmasi bir marta bosilishi kerak. Sayt ochiq va qurilma faol bo‘lsa avtomatik jadval ishlaydi.

## AI
Saytda ishlaydigan demo AI yordamchi bor. Haqiqiy AI API'ni front-endga API key bilan ulash xavfsiz emas. Haqiqiy AI uchun backend/server orqali API ulash kerak.

## Eslatma
Siz bergan vaqtlar ichida 1-smena “12:55 gacha” va 6-darsning 12:15–13:00 oralig‘i bir-biriga mos emas. Saytda jadval siz bergan alohida dars vaqtlariga yaqinlashtirilib, 2-smena oxiri 17:55 qilib qo‘yilgan. Haqiqiy maktab jadvalini `SCHEDULE` massivida bir joydan o‘zgartirish mumkin.
