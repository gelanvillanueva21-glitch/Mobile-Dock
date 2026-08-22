


export interface User{
    fullName?: string;
    email: string;
    password: string;
}


export interface UserInfo{
    fullName?: string | "guest";
    createdAt: string;
}



