import prisma from "@src/db"; 
import { user } from "@prisma/client"; 
import { TypePayloadUser } from "@modules/user/userModel"; 

export const UserKeys = [
    "user_id",
    "project_id",
    "role_id",
    "username",
    "password",
    "created_at",
    "created_by",
    "updated_at",
    "updated_by"
];

export const UserRepository = {
    // ค้นหาผู้ใช้ทั้งหมด
    findAllAsync: async () => {
        return prisma.user.findMany({
            select: {
                user_id: true,
                project_id: true,
                role_id: true,
                username: true,
                password: true,
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true
            }
        });
    },

    // ค้นหาผู้ใช้ตามชื่อผู้ใช้
    findByUsername: async (username: string, keys = UserKeys as Array<keyof user>) => {
        return prisma.user.findFirst({
            where: { username: username },
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        }) as Promise<Pick<user, keyof user> | null>;
    },

    // ค้นหาผู้ใช้ตาม user_id
    findByUserId: async (user_id: string) => {
        return prisma.user.findFirst({
            where: { user_id: user_id },
        });
    },

    // สร้างผู้ใช้ใหม่
    create: async (payload: TypePayloadUser) => {
        return await prisma.user.create({
            data: payload
        });
    },

    // อัปเดตผู้ใช้
    update: async (user_id: string, payload: Partial<TypePayloadUser>) => {
        return await prisma.user.update({
            where: { user_id: user_id },
            data: payload
        });
    },

    // ลบผู้ใช้
    delete: async (user_id: string) => {
        return await prisma.user.delete({
            where: { user_id: user_id }
        });
    }
};