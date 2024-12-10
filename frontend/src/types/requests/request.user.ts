export type PayloadCreateUser = {
    username : string;
    password : string;
    role : string;
    project_name?: string | null; // เพิ่ม null เพื่อรองรับ No Project
};

export type PayloadUpdateUser = {
    user_id : string;
    username : string;
    password? : string;
    role : string;
    project_name?: string
}

export type PayloadDeleteUser = {
    user_id : string;
}