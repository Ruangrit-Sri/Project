import express, {Request, Response} from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { projectService } from "@modules/project/projectService";
import { CreateProjectSchema } from "@modules/project/projectModel";

export const categoryRouter = (() => {
    const router = express.Router();
    router.get("/get", async (req: Request, res: Response) => {

        const ServiceResponse = await projectService.findAll();
        handleServiceResponse(ServiceResponse, res);
    }) 

    router.post("/create", validateRequest(CreateProjectSchema),
        async (req:Request, res: Response) => {
        const payload = req.body;
        const ServiceResponse = await projectService.create(payload);
        handleServiceResponse(ServiceResponse, res);
    })


    return router;
})();
