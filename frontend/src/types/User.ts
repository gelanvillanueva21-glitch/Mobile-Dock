


export interface RegisterPayload{
    full_name?: string;
    email: string;
    password: string;
}


export interface LoginPayload{
    email: string;
    password: string;
}



export interface UserInfo{
    fullName: string | null;
    email: string;
    createdAt: string;
}



