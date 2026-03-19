# Store Rating System - FullStack Coding Challenge

A full-stack web application that allows users to seamlessly register and submit ratings (1 to 5 stars) for stores on the platform. This application implements a single login system with robust Role-Based Access Control (RBAC) across three distinct user roles: System Administrators, Store Owners, and Normal Users.

## 🚀 Tech Stack

### Frontend
- **Framework:** React.js (Bootstrapped with Vite)
- **Styling:** Tailwind CSS v4 (Modern aesthetics & animations)
- **Routing:** React Router v7
- **Data Fetching:** Axios
- **State Management:** React Context API

### Backend
- **Core:** Node.js + Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma v7 (configured with `@prisma/adapter-pg` driver)
- **Authentication:** JWT (JSON Web Tokens) & Bcrypt for password hashing

---

## 👥 User Roles & Features

### 1. System Administrator
- **Dashboard Overview:** Views real-time tallies of Total Users, Total Stores, and Total Submitted Ratings.
- **Resource Management:** Add new stores and attach them to specific Store Owners. Register newly authenticated users (Normal or Admins).
- **Directory Access:** View comprehensive lists of all registered stores (including name, email, address, and aggregate ratings) and all users (displaying name, email, and roles). 
- **Owner Visibility:** When an administrator reviews a particular Store Owner in the directory, their specific store's average rating is automatically attached to the owner's profile info.
- **Filtering & Search:** Full integration sorting and searching across all user & store variables. 

### 2. Store Owner
- **Store Analytics Dashboard:** Immediately view the average star rating given to their respective store.
- **Audience Visibility:** Can visually monitor exactly which users have rated their store over time.

### 3. Normal User
- **Dynamic Store Catalog:** Complete access to search, filter, and discover all publicly registered stores across the platform.
- **Engagement:** Can submit ratings (between 1 and 5) for any individual store. If a rating has previously been submitted, they can seamlessly edit/update their score in real time.

---

## 🛠️ Local Setup Instructions

Ensure that you have Node.js and a running local instance of PostgreSQL.

### 1. Setup the Backend API

```bash
cd backend
npm install
```

Configure your PostgreSQL Database connection string:
- Copy/Rename `.env.sample` into `.env` (located inside the `backend` folder).
- Update `DATABASE_URL` with your local PostgreSQL URI. *(Ensure you URL encode any special characters, like `%40` instead of `@` in passwords).*

Apply migrations and generate the Prisma Client for your DB:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

Seed the database with Role-Based Demo Users:
```bash
node src/seed.js
```

Start the Backend Server (runs on Port 5000):
```bash
npm run dev
```

### 2. Setup the Frontend Client

Open a completely separate terminal window for the React Client:
```bash
cd frontend
npm install
```

Boot Vite:
```bash
npm run dev
```

The application client will now be live on `http://localhost:5173`.

---

## 🔒 Form Validations Enforced
- **Names**: Strictly scoped between 20-60 characters minimum to conform to business restraints.
- **Addresses**: Maximum 400 characters string limits.
- **Passwords**: Extremely secure parsing (8-16 characters mapping at least 1 Uppercase Letter and 1 Special Character).

---

> Built with ❤️ by **Yaswant**  
> GitHub: [@Yaswantsoni1128](https://github.com/Yaswantsoni1128)
