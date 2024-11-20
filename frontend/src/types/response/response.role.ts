export type TypeUserAll = {
    role_id : string;
    name : string;

}

export type TypeUser = {
    role_id : string;
    name : string;
}

export type UserResponse = {
    success: boolean;
    message: string;
    responseObject: TypeUserAll[];
    statusCode:number;
};