export type PayloadCreateUser = {
    username : string;
    password : string;
    role : string;
    project_name: string
};

export type PayloadUpdateUser = {
    user_id : string;
    username : string;
    password? : string;
    role : string;
    project_name: string
}

export type PayloadDeleteUser = {
    user_id : string;
}