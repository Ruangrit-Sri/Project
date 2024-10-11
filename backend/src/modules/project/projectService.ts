import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { projectRepository } from "@modules/project/projectRepository";
import { TypePayloadProject } from "@modules/project/projectModel";

import { project } from "@prisma/client";
export const projectService = {
    findAll: async () => {
        const project = await projectRepository.findAllAsync();
        return new ServiceResponse(
            ResponseStatus.Success,
            "Get All success",
            project,
            StatusCodes.OK
        )
    },
    create: async (payload: TypePayloadProject) => {
        try {
            const checkProject = await projectRepository.findByName(payload.project_name);
            if(checkProject){
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Project already taken",
                    null,
                    StatusCodes.BAD_REQUEST
                )
            }
            const project = await projectRepository.create(payload);
            return new ServiceResponse<project>(
                ResponseStatus.Success,
                "Create project success",
                project,
                StatusCodes.OK
            )
        } catch (ex) {
            const errorMessage = "Error create project :" + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}