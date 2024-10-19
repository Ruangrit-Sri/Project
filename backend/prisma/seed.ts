import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';  // ใช้สำหรับเข้ารหัสรหัสผ่าน

const prisma = new PrismaClient();

async function main() {
  try {
    // ตรวจสอบว่ามีผู้ใช้ rootadmin อยู่แล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { username: "rootadmin" },
    });

    if (existingUser) {
      console.log("ผู้ใช้ rootadmin มีอยู่แล้ว");
      return;
    }

    // กำหนดรหัสผ่านที่ต้องการตั้งตรงๆ
    const password = "rootadmin";  // กำหนดรหัสผ่านตรงนี้

    // เข้ารหัสรหัสผ่านที่กำหนด
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        username: "rootadmin",
        password: hashedPassword,
        role_id: "admin-role-id",  // ปรับ role_id ตามความเหมาะสม
        project_id: null,          // ถ้าจำเป็นสามารถตั้งค่าเป็น UUID ของ project
      },
    });

    console.log("สร้างผู้ใช้ rootadmin สำเร็จ:", newUser);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดใน main: ", error);
    throw error;
  }
}

// เรียกใช้ฟังก์ชัน main
main()
  .catch((e) => {
    console.error("Error detected in main:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
