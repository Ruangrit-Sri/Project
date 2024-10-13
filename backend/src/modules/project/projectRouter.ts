import express, {Request, Response} from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { projectService } from "@modules/project/projectService";
import { CreateProjectSchema } from "@modules/project/projectModel";

import { UpdateProjectSchema, DeleteProjectSchema } from "@modules/project/projectModel";

export const projectRouter = (() => {
    const router = express.Router();

    // GET all projects
    router.get("/get", async (req: Request, res: Response) => {
        const ServiceResponse = await projectService.findAll();
        handleServiceResponse(ServiceResponse, res);
    });

    // CREATE a project
    router.post("/create", validateRequest(CreateProjectSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const ServiceResponse = await projectService.create(payload);
        handleServiceResponse(ServiceResponse, res);
    });

    // UPDATE a project
    router.put("/update/:project_id", validateRequest(UpdateProjectSchema), async (req: Request, res: Response) => {
        const project_id = req.params.project_id;
        const payload = req.body;
        const ServiceResponse = await projectService.update(project_id, payload);
        handleServiceResponse(ServiceResponse, res);
    });

    // DELETE a project
    router.delete("/delete/:project_id", validateRequest(DeleteProjectSchema), async (req: Request, res: Response) => {
        const project_id = req.params.project_id;
        const ServiceResponse = await projectService.delete(project_id);
        handleServiceResponse(ServiceResponse, res);
    });

    return router;
})();

