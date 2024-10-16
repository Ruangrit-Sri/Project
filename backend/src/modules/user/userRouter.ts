import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { userService } from "@modules/user/userService";
import { CreateUserSchema, UpdateUserSchema, DeleteUserSchema } from "@modules/user/userModel";

export const userRouter = (() => {
    const router = express.Router();

    // GET all users
    router.get("/get", async (req: Request, res: Response) => {
        const ServiceResponse = await userService.findAll();
        handleServiceResponse(ServiceResponse, res);
    });

    // CREATE a user
    router.post("/create", validateRequest(CreateUserSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const ServiceResponse = await userService.create(payload);
        handleServiceResponse(ServiceResponse, res);
    });

    // UPDATE a user
    router.put("/update", validateRequest(UpdateUserSchema), async (req: Request, res: Response) => {
        const { user_id } = req.body;
        const payload = req.body;
        const ServiceResponse = await userService.update(user_id, payload);
        handleServiceResponse(ServiceResponse, res);
    });

    // DELETE a user
    router.delete("/delete/:user_id", validateRequest(DeleteUserSchema), async (req: Request, res: Response) => {
        const user_id = req.params.user_id;
        const ServiceResponse = await userService.delete(user_id);
        handleServiceResponse(ServiceResponse, res);
    });

    return router;
})();
