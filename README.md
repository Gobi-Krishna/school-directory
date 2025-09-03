# 🏫 SchoolFinder (Next.js 15 + PostgreSQL)

A responsive web application built with **Next.js 15 (App Router)** and **PostgreSQL** (hosted on Neon.tech) to help parents find and manage school information. This project was created as part of a Web Development assignment.

## 🚀 Features

*   **Add Schools:** Submit new school details via a responsive form.
*   **Find Schools:** Browse a list of schools displayed in a responsive, card-based layout.
*   **Professional UI:** Clean, modern design with a dark theme for easy viewing.
*   **Responsive Design:** Optimized for desktops, tablets, and mobile devices, including a mobile-friendly navigation menu.

## 📂 Project Structure
school-app/
├── app/
│ ├── addSchool/ # Page for adding new schools
│ │ └── page.jsx
│ ├── showSchools/ # Page for listing/viewing schools
│ │ └── page.jsx
│ ├── api/ # API routes for database interaction
│ │ ├── addSchool/route.js
│ │ ├── getSchools/route.js
│ │ └── deleteSchool/route.js
│ ├── layout.js # Root layout (includes Navbar and Footer)
│ └── page.js # Homepage
├── components/
│ ├── Navbar.jsx # Navigation bar component
│ └── SchoolCard.jsx # Reusable component for displaying a school
├── lib/
│ └── db.js # Database connection helper (PostgreSQL)
├── public/
│ └── schoolImages/ # Static assets (e.g., default school image)
├── styles/
│ └── globals.css # Global CSS styles
├── .env.local # Local environment variables (ignored by Git)
├── package.json
└── README.md # This file


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/school-directory.git
cd school-directory

npm install

3️⃣ Database Setup (PostgreSQL on Neon.tech)
This project uses PostgreSQL hosted on Neon.tech instead of local MySQL for easier deployment on Vercel.

Create a Neon Project:
Sign up/Login to Neon.tech .
Create a new project (e.g., school-db).
Note the connection details (especially the connection string).
Create the schools Table:
In the Neon dashboard, use the SQL editor to run the following command:

CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  contact VARCHAR(15),
  image TEXT,
  email_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

4️⃣ Configure Environment Variables
Local Development:
Create a .env.local file in the root directory of the project.
Add your Neon PostgreSQL connection string:

DATABASE_URL=postgresql://<user>:<password>@<endpoint>.<region>.aws.neon.tech/<dbname>?sslmode=require

Deployment (Vercel):
Go to your Vercel project dashboard.
Navigate to Settings > Environment Variables.
Add a new variable:
Name: DATABASE_URL
Value: Your full Neon connection string (same as in .env.local).
Running the Project


npm run dev


Open http://localhost:3000 in your browser.
Production Build


npm run build
npm start


 Live Demo
👉 https://school-directory-delta.vercel.app/

📌 API Endpoints
POST /api/addSchool → Add a new school to the database.
GET /api/getSchools → Retrieve all schools from the database.
POST /api/deleteSchool → Delete a school by its ID (from the database).
🛠️ Assignment Requirements Addressed
Framework: ✅ Built using Next.js 15 (App Router).
Database: ✅ Uses PostgreSQL (adapted from MySQL for deployment).
MySQL Table Structure: ✅ Implements a schools table with equivalent fields (id, name, address, city, state, contact, image, email_id).
addSchool.jsx Page:
✅ Contains a form for data input.
✅ Includes basic input validation.
✅ Accepts an image URL (adapted from local folder storage for web).
✅ Is fully responsive.
⚠️ (Note: Uses standard React state instead of react-hook-form). <!-- As per your final code -->
showSchools.jsx Page:
✅ Fetches and displays school data.
✅ Shows name, address, city, and image for each school.
✅ Uses a responsive grid layout, similar to e-commerce product listings.
✅ Is fully responsive.
Submission:
✅ Code is hosted on GitHub.
✅ Project is deployed on Vercel.
