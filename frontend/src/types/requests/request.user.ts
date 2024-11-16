export type PayloadCreateUser = {
    username : string;
    password : string;
    role : string;
};

export type PayloadUpdateUser = {
    user_id : string;
    username : string;
    role : string;
}

export type PayloadDeleteUser = {
    user_id : string;
}