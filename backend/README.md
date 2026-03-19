# Store Rating System Backend

## Setup

1. Copy `.env.sample` to `.env` (or just edit the `.env`).
2. Update the `DATABASE_URL` with your PostgreSQL database connection string.
3. Run `npm install`.
4. Run `npx prisma db push` to generate the database schema.
5. Setup initial admin by modifying DB manually, or using the first user (we haven't set an automatic first user script, so you can just seed or use the API manually, or create a `NORMAL_USER` first and change role in DB to `SYSTEM_ADMINISTRATOR` or `STORE_OWNER`). For review purposes, I recommend registering a normal user and changing the role in the DB using Prisma Studio (`npx prisma studio`).

## Start

- development: `npm run dev`
- production: `npm start`
