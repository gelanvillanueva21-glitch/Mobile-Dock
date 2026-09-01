

import { useEffect, useState } from "react";
import { Avatar } from "../../layouts/Profile/AvatarProfile";
import { SearchUser } from "../../layouts/Profile/SearchInput";
import { getProfile } from "../../services/profile";
import { UserDescription } from "../../layouts/Profile/Description";


import guestProfile from "../../assets/icon/guest-profile.svg";
import { SocialMediaButton } from "../../layouts/Profile/SocialMedia";
import { AccountAction } from "../../layouts/Profile/AccountAction";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../utilities/AuthProvider";
import { ErrorWindow } from "../../components/ErrorWindow";


export function Profile() {
    const [errorWindow, setErrorWindow] = useState<"error" | null>(null);

    const { user } = useAuth();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        enabled: !!user
    });

    function onCloseHandle() {
        setErrorWindow(null);
    }

    return (
        <main className="profile-section">

            {error && errorWindow? (
                <ErrorWindow  onClose={onCloseHandle} onTryAgain={refetch}/>
            ) : (
                <>
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
                                profile={data?.avatar_url? `http://127.0.0.1:8000/avatars/${data.avatar_url}` : guestProfile}
                                fullName={data?.full_name? data.full_name : "guest"}
                            />
                            <UserDescription 
                                description={data && data?.about_me === null? "Currently empty. Have not edit it yet." : data?.about_me}
                                guestDescription={"Must log in first."}
                            />
                            <div className="social-and-account-box">
                                <SocialMediaButton 
                                    facebook={data?.social_media.facebook_url}
                                    instagram={data?.social_media.instagram_url}
                                    linkedin={data?.social_media.linkedin_url}
                                />
                                <AccountAction/>
                            </div>
                        </div>
                    )}
                </>
            )}
        </main>
    )

}


