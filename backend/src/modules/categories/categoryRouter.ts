import express, {Request, Response} from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { categoryService } from "@modules/categories/categoryService";
import { CreateCategorySchema } from "@modules/categories/categoryModel";

export const categoryRouter = (() => {
    const router = express.Router();
    router.get("/get", async (req: Request, res: Response) => {

        const ServiceResponse = await categoryService.findAll();
        handleServiceResponse(ServiceResponse, res);
    }) 

    router.post("/create", validateRequest(CreateCategorySchema),
        async (req:Request, res: Response) => {
        const payload = req.body;
        const ServiceResponse = await categoryService.create(payload);
        handleServiceResponse(ServiceResponse, res);
    })


    return router;
})();
