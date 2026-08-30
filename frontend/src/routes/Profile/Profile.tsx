

import { useEffect, useState } from "react";
import { Avatar } from "../../layouts/Profile/AvatarProfile";
import { SearchUser } from "../../layouts/Profile/SearchInput";
import type { ProfileInfo } from "../../types/Profile";
import { getProfile } from "../../services/profile";
import { UserDescription } from "../../layouts/Profile/Description";


export function Profile() {
    const [profile, setProfile] = useState<ProfileInfo | null>(null);
    const [guestDescription, setGuestDescription] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProfile().then(setProfile)
        .catch(() => setGuestDescription('You have not log in'))
        .finally(() => setIsLoading(false))
    }, []);

    return (
        <main className="profile-section">
            <div className="profile-box">
                <SearchUser/>
                <Avatar 
                    profile={profile?.avatar_url? profile.avatar_url : ""}
                    fullName={profile?.full_name? profile.full_name : "guest"}
                />
                <UserDescription 
                    description={profile?.about_me}
                    guestDescription={guestDescription}
                />
            </div>
        </main>
    )

}


