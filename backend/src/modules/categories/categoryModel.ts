import { z } from "zod";

export type TypePayloadCategory = {
    category_name: string;
};

export const CreateCategorySchema = z.object({
    body: z.object({
        category_name: z.string().max(50),
    })
})