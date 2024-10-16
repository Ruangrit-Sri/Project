import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { UserRepository } from "@modules/user/userRepository";
import { TypePayloadUser } from "@modules/user/userModel";
import { user } from "@prisma/client";

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
                    "Username already taken",
                    null,
                    StatusCodes.BAD_REQUEST
                );
            }
            const user = await UserRepository.create(payload);
            return new ServiceResponse<user>(
                ResponseStatus.Success,
                "Create user success",
                user,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error create user: " + (ex as Error).message;
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
