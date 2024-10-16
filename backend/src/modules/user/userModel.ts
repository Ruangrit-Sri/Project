import { z } from "zod";

// ประเภทข้อมูลสำหรับ payload ของ User
export type TypePayloadUser = {
    project_id?: string;    // UUID, optional
    role_id: string;        // UUID
    username: string;
    password_hash: string;
    created_by?: string;    // UUID, optional
    updated_by?: string;    // UUID, optional
};

// Schema สำหรับการสร้าง User ใหม่
export const CreateUserSchema = z.object({
    body: z.object({
        project_id: z.string().uuid().optional(),
        role_id: z.string().uuid(),
        username: z.string().max(255),
        password_hash: z.string().max(255),
        created_by: z.string().uuid().optional(),
        updated_by: z.string().uuid().optional(),
    }),
});

// Schema สำหรับการอัปเดต User
export const UpdateUserSchema = z.object({
    body: z.object({
        user_id: z.string().uuid(), // ต้องระบุ user_id เพื่อทำการอัปเดต
        project_id: z.string().uuid().optional(),
        role_id: z.string().uuid().optional(),
        username: z.string().max(255).optional(),
        password_hash: z.string().max(255).optional(),
        updated_by: z.string().uuid().optional(),  // ต้องระบุ updated_by เพื่อบันทึกว่าใครแก้ไข
    })
});

// Schema สำหรับการลบ User
export const DeleteUserSchema = z.object({
    params: z.object({
        user_id: z.string().uuid(),  // รับ UUID สำหรับลบ
    })
});
