


export interface ProfileInfo{
    id: number;
    email: string;
    full_name: string | "guest";
    avatar_url: string;
    about_me: string;
    social_media: SocialMedia
}


interface SocialMedia{
    facebook_url: string;
    instagram_url: string;
    linkedin_url: string;
}


