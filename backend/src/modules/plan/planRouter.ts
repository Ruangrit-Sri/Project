import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { planService } from "@modules/plan/planService"; // ใช้ service ของ plan แทน project
import { CreatePlanSchema, UpdatePlanSchema, DeletePlanSchema } from "@modules/plan/planModel"; // ใช้ schema ของ plan

export const planRouter = (() => {
    const router = express.Router();

    // GET all plans
    router.get("/get", async (req: Request, res: Response) => {
        const ServiceResponse = await planService.findAll(); // เรียกใช้งานฟังก์ชัน findAll ของ planService
        handleServiceResponse(ServiceResponse, res);
    });

    // CREATE a plan
    router.post("/create", validateRequest(CreatePlanSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const ServiceResponse = await planService.create(payload); // ใช้ฟังก์ชัน create ของ planService
        handleServiceResponse(ServiceResponse, res);
    });

    // UPDATE a plan
    router.put("/update", validateRequest(UpdatePlanSchema), async (req: Request, res: Response) => {
        const { plan_id } = req.body;
        const payload = req.body;
        const ServiceResponse = await planService.update(plan_id, payload); // ใช้ฟังก์ชัน update ของ planService
        handleServiceResponse(ServiceResponse, res);
    });

    // DELETE a plan
    router.delete("/delete", validateRequest(DeletePlanSchema), async (req: Request, res: Response) => {
        const { plan_id } = req.body; // ดึง plan_id จาก body
        const ServiceResponse = await planService.delete(plan_id); // ใช้ฟังก์ชัน delete ของ planService
        handleServiceResponse(ServiceResponse, res);
    });

    return router;
})();
