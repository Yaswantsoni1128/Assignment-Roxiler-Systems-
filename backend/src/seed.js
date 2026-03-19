import bcrypt from 'bcrypt';
import prisma from './prisma.js';

async function main() {
  const password = await bcrypt.hash('Password@123', 10);

  const users = [
    {
      name: 'System Administrator Person',
      email: 'admin@test.com',
      password,
      address: '123 Admin Lane, Test City',
      role: 'SYSTEM_ADMINISTRATOR'
    },
    {
      name: 'Store Owner Awesome Person',
      email: 'owner@test.com',
      password,
      address: '456 Owner Blvd, Test City',
      role: 'STORE_OWNER'
    },
    {
      name: 'Normal User Standard Person',
      email: 'user@test.com',
      password,
      address: '789 User Street, Test City',
      role: 'NORMAL_USER'
    }
  ];

  for (const user of users) {
    const existing = await prisma.user.findUnique({ where: { email: user.email }});
    if (!existing) {
      await prisma.user.create({ data: user });
      console.log(`Created test user: ${user.email} (${user.role})`);
    } else {
      console.log(`User ${user.email} already exists`);
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
