import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { TaskRepository } from "@modules/task/taskRepository";
import { TypePayloadTask } from "@modules/task/taskModel";
import { task } from "@prisma/client";

export const taskService = {
    // อ่านข้อมูล task ทั้งหมด
    findAll: async () => {
        const tasks = await TaskRepository.findAllAsync();
        return new ServiceResponse(
            ResponseStatus.Success,
            "Get All tasks success",
            tasks,
            StatusCodes.OK
        );
    },

    // สร้าง task ใหม่
    create: async (payload: TypePayloadTask) => {
        try {
            const checkTask = await TaskRepository.findByName(payload.task_name);
            if (checkTask) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Task name already taken",
                    null,
                    StatusCodes.BAD_REQUEST
                );
            }
            const task = await TaskRepository.create(payload);
            return new ServiceResponse<task>(
                ResponseStatus.Success,
                "Create task success",
                task,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error creating task: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    // อัปเดต task
    update: async (task_id: string, payload: Partial<TypePayloadTask>) => {
        try {
            // ตรวจสอบว่า Task มีอยู่หรือไม่
            const existingTask = await TaskRepository.findById(task_id); // ต้องเพิ่ม findById ใน TaskRepository
            if (!existingTask) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Not found task",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }

            // ถ้า Task มีอยู่ ทำการอัปเดต
            const updatedTask = await TaskRepository.update(task_id, payload);
            return new ServiceResponse<task>(
                ResponseStatus.Success,
                "Update task success",
                updatedTask,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error updating task: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    // ลบ task
    delete: async (task_id: string) => {
        try {
            // ตรวจสอบว่า Task มีอยู่หรือไม่
            const existingTask = await TaskRepository.findById(task_id); // ต้องเพิ่ม findById ใน TaskRepository
            if (!existingTask) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Not found task",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            
            await TaskRepository.delete(task_id);
            return new ServiceResponse(
                ResponseStatus.Success,
                "Delete task success",
                null,
                StatusCodes.OK
            );    
        } catch (ex) {
            const errorMessage = "Error deleting task: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

};
