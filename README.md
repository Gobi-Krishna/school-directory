🏫 School Directory (Next.js + MySQL)

A simple School Directory project built with Next.js 15 (App Router) and MySQL (hosted on Railway).
It allows you to add, view, and delete schools with a clean UI.

🚀 Features

Add new schools with details (name, address, city, state, contact, image, email).

View all schools in a responsive card layout.

Delete schools directly from the UI.

MySQL backend with Railway hosting.

Deployed on Vercel.

📂 Project Structure
school-app/
├── app/
│   ├── addSchool/         # UI page for adding schools
│   │   └── page.jsx
│   ├── showSchools/       # UI page for listing schools
│   │   └── page.jsx
│   ├── api/               # API routes
│   │   ├── addSchool/route.js
│   │   ├── getSchools/route.js
│   │   └── deleteSchool/route.js
│   ├── layout.js
│   └── page.js            # Homepage
├── components/
│   └── SchoolCard.jsx     # Card component for schools
├── lib/
│   └── db.js              # MySQL connection helper
├── public/
│   └── schoolImages/      # (Optional) Static school images
├── styles/
│   └── globals.css
├── .env.local             # Local environment variables (ignored by Git)
├── package.json
└── README.md

⚙️ Setup Instructions
1️⃣ Clone Repo
git clone https://github.com/<your-username>/school-directory.git
cd school-directory

2️⃣ Install Dependencies
npm install

3️⃣ Database Setup
Option A: Import from SQL file

If you have a schoolDB.sql file:

mysql -u <username> -p < database_name < schoolDB.sql

Option B: Create Table Manually

Run this in MySQL:

CREATE DATABASE schoolDB;
USE schoolDB;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  contact VARCHAR(15),
  image TEXT,
  email_id TEXT
);

4️⃣ Configure Environment Variables
Local (create .env.local in root):
DATABASE_URL=mysql://username:password@host:port/database

Vercel:

Go to Project → Settings → Environment Variables.

Add:

DATABASE_URL → same value as above.

▶️ Running the Project
Development
npm run dev


Visit: http://localhost:3000

Production
npm run build
npm start

🌐 Live Demo

👉 https://your-vercel-app.vercel.app

📌 API Endpoints

POST /api/addSchool → Add a school

GET /api/getSchools → Get all schools

POST /api/deleteSchool → Delete a school