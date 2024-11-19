import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // เข้ารหัสรหัสผ่าน rootadmin
  // const hashedPassword = await bcrypt.hash('admin123', 10);

  // สร้างหรืออัปเดตผู้ใช้ rootadmin
  const rootAdmin = await prisma.user.upsert({
    where: { username: 'rootadmin' },  // ค้นหาจาก username
    update: {},  // ถ้าพบจะไม่อัปเดตข้อมูลเพิ่มเติม
    create: {
      username: 'rootadmin',
      password: 'admin123',  // รหัสผ่านที่เข้ารหัส
      role : 'rootadmin',  // อัปเดต role_id ให้ตรงกับ schema ของคุณ
      // สามารถเพิ่มฟิลด์อื่นๆ ตาม schema ของตาราง user
    },
  });

  const roles = ['rootadmin', 'admin', 'CEO', 'manager', 'employee'];
  const rolePromises = roles.map((roleName) =>
    prisma.role.upsert({
      where: { name: roleName },
      update: {}, // ถ้าพบจะไม่อัปเดตข้อมูลเพิ่มเติม
      create: { name: roleName },
    })
  );

  const roleResults = await Promise.all(rolePromises);

  console.log({ roleResults });
  console.log({ rootAdmin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    // await prisma.$disconnect();
    // process.exit(1);
  });
