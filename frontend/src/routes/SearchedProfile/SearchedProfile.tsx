

import { useParams } from "react-router-dom"
import { getProfileById } from "../../services/profile";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "../../layouts/Profile/AvatarProfile";


import guestIcon from "../../assets/icon/guest-profile.svg";
import { UserDescription } from "../../layouts/Profile/Description";
import { SocialMediaButton } from "../../layouts/Profile/SocialMedia";


export function SearchedProfile() {
    const { userId } = useParams();
    const id = Number(userId);

    const { data, isLoading, error } = useQuery({
        queryKey: ["profile", id],
        queryFn: () => getProfileById(id)
    });


    return (
        <>
            <main>
                {isLoading? (
                    <div>

                    </div>
                ) : (
                    <div>
                        <Avatar 
                            fullName={data?.full_name? data.full_name : "guest"}
                            profile={data?.avatar_url? `http://127.0.0.1:8000/avatars/${data.avatar_url}` : guestIcon}
                        />
                        <div>
                            <UserDescription 
                                description={data?.about_me}
                                guestDescription={"User have not edited description."}
                            />
                            <div>
                                <SocialMediaButton
                                    facebook={data?.social_media.facebook_url ?? undefined}
                                    instagram={data?.social_media.instagram_url ?? undefined}
                                    linkedin={data?.social_media.linkedin_url ?? undefined}
                                />
                            </div>
                        </div>

                        {error && (
                            <div>
                                <h1>Hello World!</h1>
                            </div>
                        )}

                    </div>
                    )}
            </main>
        </>
    )
}

