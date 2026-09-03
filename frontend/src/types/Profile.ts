


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
    facebook_url: string | null;
    instagram_url: string | null;
    linkedin_url: string | null;
}


