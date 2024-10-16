import prisma from "@src/db"; 
import { user } from "@prisma/client";  // ชื่อที่ตรงกับ schema ของ Prisma
import { TypePayloadUser } from "@modules/user/userModel";

export const UserKeys = [
    "user_id",
    "project_id",
    "role_id",
    "username",
    "password_hash",
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
                password_hash: true,
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true
            }
        });
    },

    // ค้นหาผู้ใช้ตาม username
    findByUsername: async <Key extends keyof user>(
        username: string,
        keys = UserKeys as Key[]
    ) => {
        return prisma.user.findFirst({
            where: { username: username },
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        }) as Promise<Pick<user, Key> | null>;
    },

    // สร้างผู้ใช้ใหม่
    create: async (payload: TypePayloadUser) => {
        const username = payload.username.trim();
        const setPayload: any = {
            project_id: payload.project_id,
            role_id: payload.role_id,
            username: username,
            password_hash: payload.password_hash,
            created_by: payload.created_by,
            updated_by: payload.updated_by,
        };

        return await prisma.user.create({
            data: setPayload
        });
    },

    // อัปเดตข้อมูลผู้ใช้
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
