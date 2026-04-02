import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@alantra.co.id",
      password: hash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Admin created:", admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
