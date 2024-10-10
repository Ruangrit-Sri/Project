import { z } from "zod";

export type TypePayloadProject = {
    project_name: string;
};

export const CreateProjectSchema = z.object({
    body: z.object({
        project_name: z.string().max(50),
    })
})