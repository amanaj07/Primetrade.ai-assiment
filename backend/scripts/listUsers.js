const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async ()=>{
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true } });
  console.log(users);
  await prisma.$disconnect();
})();
