

import { useEffect, useState } from "react";
import { Avatar } from "../../layouts/Profile/AvatarProfile";
import { SearchUser } from "../../layouts/Profile/SearchInput";
import type { ProfileInfo } from "../../types/Profile";
import { getProfile } from "../../services/profile";
import { UserDescription } from "../../layouts/Profile/Description";


import guestProfile from "../../assets/icon/guest-profile.svg";
import { SocialMediaButton } from "../../layouts/Profile/SocialMedia";
import { AccountAction } from "../../layouts/Profile/AccountAction";
import { useAuth } from "../../utilities/AuthProvider";


export function Profile() {
    const [profile, setProfile] = useState<ProfileInfo | null>(null);
    const [guestDescription, setGuestDescription] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        setIsLoading(true);

        getProfile()
            .then(setProfile)
            .catch(() => setGuestDescription('You have not log in'))
            .finally(() => setIsLoading(false))
    }, [user]);

    return (
        <main className="profile-section">
            {isLoading ? (
                <div className="profile-skeleton">
                    <div className="skeleton-avatar" />
                    <div className="skeleton-name" />
                    <div className="skeleton-info">
                        <div className="skeleton-info-left" />
                        <div className="skeleton-info-right" />
                    </div>
                    <div className="skeleton-bottom">
                        <div className="skeleton-bottom-left" />
                        <div className="skeleton-bottom-right" />
                    </div>
                </div>
            ) : (
                <div className="profile-box">
                    <SearchUser/>
                    <Avatar 
                        profile={profile?.avatar_url? `http://127.0.0.1:8000/avatars/${profile.avatar_url}` : guestProfile}
                        fullName={profile?.full_name? profile.full_name : "guest"}
                    />
                    <UserDescription 
                        description={user && profile?.about_me === null? `${profile.full_name}'s description empty` : profile?.about_me}
                        guestDescription={guestDescription}
                    />
                    <div className="social-and-account-box">
                        <SocialMediaButton 
                            facebook={profile?.social_media.facebook_url}
                            instagram={profile?.social_media.instagram_url}
                            linkedin={profile?.social_media.linkedin_url}
                        />
                        <AccountAction/>
                    </div>
                </div>
            )}
        </main>
    )

}


