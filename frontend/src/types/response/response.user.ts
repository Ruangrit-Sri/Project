export type TypeUserAll = {
    user_id : string;
    project_id : string;
    role : string;
    username : string;
    password : string;
    created_at : string;
    created_by : string;
    updated_at : string;
    updated_by : string;

}

export type TypeUser = {
    user_id : string;
    project_id : string;
    role : string;
    username : string;
    password : string;
    created_at : string;
    created_by : string;
    updated_at : string;
    updated_by : string;
}

export type UserResponse = {
    success: boolean;
    message: string;
    responseObject: TypeUser;
    statusCode:number;
};