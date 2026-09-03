

import type { ProfileInfo } from "../../types/Profile";

import editIcon from "../../assets/icon/edit-3-svgrepo-com.svg";
import guestIcon from "../../assets/icon/guest-profile.svg";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { editProfile } from "../../services/profile";

interface Props{
    profile?: ProfileInfo;
    onClose: () => void;
}


export function EditProfile({ profile, onClose }: Props) {
    const [fullName, setFullName] = useState("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [aboutMe, setAboutMe] = useState( profile?.about_me? profile.about_me : "");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [clickEdit, setClickEdit] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const profilePictureUrl = profilePicture
        ? URL.createObjectURL(profilePicture)
        : profile?.avatar_url ?? guestIcon;


    function clickHandle() {
        console.log("Clicked!")
        setIsLoading(true);
        const data = {
            full_name: fullName || null,
            avatar_url: profilePicture,
            about_me: aboutMe || null,
            social_media: { 
                facebook_url: facebookUrl || null,
                instagram_url: instagramUrl || null,
                linkedin_url: linkedinUrl || null
            }
        };
        const mutation = useMutation({
            mutationFn: editProfile
        })
        mutation.mutate(data)

        if (mutation.isSuccess) {
            setError(null);
            return;
        }

        if (mutation.isError) {
            setError("Failed to change profile.");
            return;
        }

        setIsLoading(false);
        onClose();
        return;

    }

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-4">
                <div className="relative h-28 w-28">
                    <img 
                        src={profilePictureUrl}
                        alt="Profile"
                        className="h-full w-full rounded-full border border-gray-200 object-cover" 
                    />
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-1 left-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
                    >
                        <img 
                            src={editIcon} 
                            alt="+"
                            className="h-4 w-4 object-contain"
                        />
                    </button>
                    </div>
                <div>
                    <input 
                        type="text"
                        placeholder={profile?.full_name? profile.full_name : fullName ?? "guest"}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-900 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
                    />
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4">
                    <textarea 
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                        placeholder="Tell me about yourself..."
                        className="min-h-32 w-full resize-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                    />
                </div>
                <div className="rounded-xl border border-gray-200 p-4">

                    {/* Statistic soon */}

                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex overflow-hidden rounded-lg border border-gray-300">
                    <span className="flex shrink-0 items-center bg-gray-100 px-3 text-sm text-gray-500">
                        https://facebook.com/
                    </span>
                    <input 
                        type="text"
                        value={facebookUrl}
                        onChange={(e) => setFacebookUrl(e.target.value)}
                        placeholder="url_user"
                        className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-900 outline-none" 
                    />
                </div>
                <div className="flex overflow-hidden rounded-lg border border-gray-300">
                    <span className="flex shrink-0 items-center bg-gray-100 px-3 text-sm text-gray-500">
                        https://instagram.com/
                    </span>
                    <input 
                        type="text"
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        placeholder="url_user"
                        className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-900 outline-none" 
                    />
                </div>
                <div className="flex overflow-hidden rounded-lg border border-gray-300">
                    <span className="flex shrink-0 items-center bg-gray-100 px-3 text-sm text-gray-500">
                        https://linkedin.com/
                    </span>
                    <input 
                        type="text"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="url_user"
                        className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-900 outline-none" 
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-200 pt-5">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                    Cancel.
                </button>
                <button 
                    type="button"
                    onClick={() => setClickEdit(true)}
                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Save changes.
                </button>
            </div>

            {clickEdit && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/20 p-4">
                    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Save profile changes?
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Your updated profile information will be saved.
                        </p>

                        {error && (
                            <p className="">
                                {error}
                            </p>
                        )}

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setClickEdit(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                No
                            </button>

                            <button
                                type="button"
                                onClick={clickHandle}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                {isLoading? "Saving profile..." : "Yes, Save."}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )

}



