import prisma from "@src/db";
import { Project } from "@prisma/client"; // เปลี่ยนชื่อเป็น Project
import { TypePayloadProject } from "@modules/project/projectModel";

export const Keys = [
    "project_id",
    "project_name",
    "budget",
    "start_date",
    "end_date",
    "status",
    "project_image",
    "created_at",
    "created_by",
    "updated_at",
    "updated_by"
]

export const ProjectRepository = {
    findAllAsync: async () => {
        return prisma.Project.findMany({
            select: {
                project_id: true,
                project_name: true
            }
        });
    },
    
    findByName: async <Key extends keyof Project>(
        project_name: string,
        keys = Keys as Key[]
    ) => {
        return prisma.Project.findUnique({
            where: { project_name: project_name },
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        }) as Promise<Pick<Project, Key> | null>;
    },
    
    create: async (payload: TypePayloadProject) => {
        const project_name = payload.project_name.trim();
        const setPayload: any = {
            project_name: project_name
        }

        return await prisma.Project.create({
            data: setPayload,
        });
    }
}
