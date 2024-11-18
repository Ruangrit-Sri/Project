export type PayloadCreateProject = {
    project_name : string;
    budget : number;
    status : boolean;
    start_date : string;
    end_date : string;
};

export type PayloadUpdateProject = {
    project_id : string;
    project_name : string;
    budget : number;
    status : boolean;
    start_date : string;
    end_date : string;
}

export type PayloadDeleteProject = {
    project_id : string;
}