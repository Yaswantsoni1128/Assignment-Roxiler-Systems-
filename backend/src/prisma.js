import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new pg.Pool({
  user: 'postgres',
  password: 'Postgres@1234',
  host: 'localhost',
  port: 5432,
  database: 'store_rating_app'
});
const adapter = new PrismaPg(pool);


const prisma = new PrismaClient({ adapter });

export default prisma;
