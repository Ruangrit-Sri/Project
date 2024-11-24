export type PayloadCreateUser = {
    username : string;
    password : string;
    role : string;
    project: string
};

export type PayloadUpdateUser = {
    user_id : string;
    username : string;
    role : string;
    project: string
}

export type PayloadDeleteUser = {
    user_id : string;
}