

import { ApiRequest } from "./client"
import type { ProfileInfo } from "../types/Profile"


export function getProfile(): Promise<ProfileInfo> {
    return ApiRequest('profile');
}


export function searchProfile(name: string): Promise<ProfileInfo[]> {
    return ApiRequest(`profile/${name}`);
}




