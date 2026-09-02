

import { ApiRequest } from "./client"
import type { ChangeProfile, ProfileInfo } from "../types/Profile"


export function getProfile(): Promise<ProfileInfo> {
    return ApiRequest('profile');
}


export function searchProfile(name: string): Promise<ProfileInfo[]> {
    return ApiRequest(`profile/${name}`);
}


export function editProfile(data: ChangeProfile): Promise<ChangeProfile>  {
    const formData = new FormData();

    formData.append("full_name", data.full_name ?? "");
    formData.append("about_me", data.about_me ?? "");

    if (data.avatar_url) 
        formData.append("avatar_url", data.avatar_url);

    formData.append("social_media", JSON.stringify(data.social_media));

    return ApiRequest('profile/change_profile', {
        method: 'POST',
        body: formData
    });
}


