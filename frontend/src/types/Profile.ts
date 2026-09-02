


export interface ProfileInfo{
    id: number;
    email: string;
    full_name: string | null;
    avatar_url: string;
    about_me: string;
    social_media: SocialMedia
}


export interface ChangeProfile{
    full_name: string | null;
    avatar_url: File | null;
    about_me: string | null;
    social_media: SocialMedia;
}


export interface SocialMedia{
    facebook_url: string;
    instagram_url: string;
    linkedin_url: string;
}


