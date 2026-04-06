import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.jadwal.deleteMany({});
  console.log(`Deleted ${deleted.count} jadwal`);
}

main().finally(() => prisma.$disconnect());
