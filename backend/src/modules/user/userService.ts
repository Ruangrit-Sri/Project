import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { UserRepository } from "@modules/user/userRepository";
import { TypePayloadUser } from "@modules/user/userModel";
import { user } from "@prisma/client";
import bcrypt from "bcrypt"; 

export const userService = {
    // อ่านข้อมูลผู้ใช้ทั้งหมด
    findAll: async () => {
        const users = await UserRepository.findAllAsync();
        return new ServiceResponse(
            ResponseStatus.Success,
            "Get All success",
            users,
            StatusCodes.OK
        );
    },

    // สร้างผู้ใช้ใหม่
    create: async (payload: TypePayloadUser) => {
        try {
            const checkUser = await UserRepository.findByUsername(payload.username);
            if (checkUser) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Username นี้ถูกใช้แล้ว",
                    null,
                    StatusCodes.BAD_REQUEST
                );
            }
            // เข้ารหัสรหัสผ่านก่อนบันทึก
            const hashedPassword = await bcrypt.hash(payload.password, 10);
            const user = await UserRepository.create({ 
                ...payload, 
                password: hashedPassword 
            });
            return new ServiceResponse<user>(
                ResponseStatus.Success,
                "สร้างผู้ใช้สำเร็จ",
                user,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "เกิดข้อผิดพลาดในการสร้างผู้ใช้: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    // อัปเดตข้อมูลผู้ใช้
    update: async (user_id: string, payload: Partial<TypePayloadUser>) => {
        try {
            const user = await UserRepository.update(user_id, payload);
            return new ServiceResponse<user>(
                ResponseStatus.Success,
                "Update user success",
                user,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error update user: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    // ลบผู้ใช้
    delete: async (user_id: string) => {
        try {
            await UserRepository.delete(user_id);
            return new ServiceResponse(
                ResponseStatus.Success,
                "Delete user success",
                null,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error delete user: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
};
