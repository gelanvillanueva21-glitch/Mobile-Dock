

import { useParams } from "react-router-dom"
import { getProfileById } from "../../services/profile";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "../../layouts/Profile/AvatarProfile";


import guestIcon from "../../assets/icon/guest-profile.svg";
import { UserDescription } from "../../layouts/Profile/Description";
import { SocialMediaButton } from "../../layouts/Profile/SocialMedia";
import { useState } from "react";


interface ErrorWindowProps{
    setErrorWindow: () => void;
    refetch: () => void;
}


function ErrorWindow({ setErrorWindow, refetch }: ErrorWindowProps) {

    return (
        <div className="profile-error-dialog">
            <button
                type="button"
                className="profile-error-close"
                onClick={setErrorWindow}
                aria-label="Close"
            >
                ×
            </button>

            <div className="profile-error-icon">
                !
            </div>

                <h1 className="profile-error-title">
                    Something went wrong
                </h1>

                <p className="profile-error-message">
                    We couldn't load this profile right now.
                    Please check your connection and try again.
                </p>

                <button
                    type="button"
                    className="profile-error-retry"
                    onClick={refetch}
                >
                    Try again
                </button>
        </div>
    )
}



export function SearchedProfile() {
    const [errorWindow, setErrorWindow] = useState(false);
    const { userId } = useParams();
    const id = Number(userId);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["profile", id],
        queryFn: () => getProfileById(id)
    });

    if (error) {
        setErrorWindow(true);
    }

    return (
        <>
            <main className="relative min-h-screen">
                {isLoading ? (
                    <div className="mx-auto flex max-w-3xl animate-pulse flex-col items-center gap-6 p-8">
                        <div className="h-24 w-24 rounded-full bg-gray-200" />
                        <div className="h-6 w-24 rounded bg-gray-200" />

                        <div className="w-full">
                            <div className="grid min-h-138px grid-cols-2 gap-8 rounded-xl border border-gray-200 p-8">
                                <div className="space-y-4">
                                    <div className="h-4 w-24 rounded bg-gray-200" />
                                    <div className="h-4 w-4/5 rounded bg-gray-200" />
                                    <div className="h-4 w-3/5 rounded bg-gray-200" />
                                </div>

                                <div>
                                    <div className="h-4 w-24 rounded bg-gray-200" />
                                </div>
                            </div>
                            <div className="mt-6 rounded-xl border border-gray-200 p-5">
                                <div className="h-4 w-28 rounded bg-gray-200" />

                                <div className="mt-4 flex gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-gray-200" />
                                    <div className="h-10 w-10 rounded-lg bg-gray-200" />
                                    <div className="h-10 w-10 rounded-lg bg-gray-200" />
                                </div>
                            </div>

                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 p-8">
                            <Avatar
                                fullName={data?.full_name ?? "guest"}
                                profile={
                                    data?.avatar_url
                                        ? `http://127.0.0.1:8000/avatars/${data.avatar_url}`
                                        : guestIcon
                                }
                            />

                            <div className="w-full">
                                <UserDescription
                                    description={data?.about_me}
                                    guestDescription="User have not edited description."
                                />

                                <div className="mt-6 rounded-xl border border-gray-200 p-5 text-center">
                                    <SocialMediaButton
                                        facebook={data?.social_media?.facebook_url ?? undefined}
                                        instagram={data?.social_media?.instagram_url ?? undefined}
                                        linkedin={data?.social_media?.linkedin_url ?? undefined}
                                    />
                                </div>
                            </div>
                        </div>

                        {(error && errorWindow) && (
                            <ErrorWindow 
                                setErrorWindow={() => setErrorWindow(false)} 
                                refetch={() => refetch()} 
                            />
                        )}
                    </>
                )}
            </main>
        </>
    )
}


