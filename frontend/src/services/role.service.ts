import axios from "axios";
import { UserResponse } from "@/types/response/response.role";

export const getRoles = async (): Promise<UserResponse> => {
    const response = await axios.get("/api/roles");
    return response.data;
  };
  