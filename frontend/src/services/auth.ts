
import { ApiRequest } from "./client";
import type { RegisterPayload, LoginPayload, UserInfo } from '../types/User';




export function login(data: LoginPayload): Promise<{ message: string }> {
    return ApiRequest('auth/login', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}


export function register(data: RegisterPayload): Promise<UserInfo> {
    return ApiRequest('auth/register', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}


export function logout(): Promise<{ message: string }> {
    return ApiRequest('auth/logout', { method: 'POST' });
}


export function getCurrentUser(): Promise<UserInfo> {
    return ApiRequest('auth/me');
}




