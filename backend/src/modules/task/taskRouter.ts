import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { taskService } from "@modules/task/taskService";
import { CreateTaskSchema, UpdateTaskSchema, DeleteTaskSchema } from "@modules/task/taskModel";

export const taskRouter = (() => {
    const router = express.Router();

    // GET all tasks
    router.get("/get", async (req: Request, res: Response) => {
        const ServiceResponse = await taskService.findAll();
        handleServiceResponse(ServiceResponse, res);
    });

    // CREATE a task
    router.post("/create", validateRequest(CreateTaskSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const ServiceResponse = await taskService.create(payload);
        handleServiceResponse(ServiceResponse, res);
    });

    // UPDATE a task
    router.put("/update", validateRequest(UpdateTaskSchema), async (req: Request, res: Response) => {
        const { task_id } = req.body;
        const payload = req.body;
        const ServiceResponse = await taskService.update(task_id, payload);
        handleServiceResponse(ServiceResponse, res);
    });

    // DELETE a task
    router.delete("/delete", validateRequest(DeleteTaskSchema), async (req: Request, res: Response) => {
        const { task_id } = req.body; // Extract task_id from the body
        const ServiceResponse = await taskService.delete(task_id);
        handleServiceResponse(ServiceResponse, res);
    });

    return router;
})();
