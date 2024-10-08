import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { categoryRepository } from "@modules/categories/categoryRepository";
import { TypePayloadCategory } from "@modules/categories/categoryModel";

import { categories } from "@prisma/client";
export const categoryService = {
    findAll: async () => {
        const categories = await categoryRepository.findAllAsync();
        return new ServiceResponse(
            ResponseStatus.Success,
            "Get All success",
            categories,
            StatusCodes.OK
        )
    },
    create: async (payload: TypePayloadCategory) => {
        try {
            const checkCategory = await categoryRepository.findByName(payload.category_name);
            if(checkCategory){
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Category already taken",
                    null,
                    StatusCodes.BAD_REQUEST
                )
            }
            const category = await categoryRepository.create(payload);
            return new ServiceResponse<categories>(
                ResponseStatus.Success,
                "Create category success",
                category,
                StatusCodes.OK
            )
        } catch (ex) {
            const errorMessage = "Error create category :" + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}