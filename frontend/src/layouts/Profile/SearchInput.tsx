

import { useEffect, useState } from "react";
import { ApiRequest } from "../../services/client";
import { UsersOutPut } from "./SearchOutput";
import { data } from "react-router-dom";
import { useAuth } from "../../utilities/AuthProvider";
import { searchProfile } from "../../services/profile";
import type { ProfileInfo } from "../../types/Profile";


export function SearchUser() {
    const [searchUser, setSearchUser] = useState("");
    const [profile, setProfile] = useState<ProfileInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!searchUser.trim()) {
            setProfile([]);
            setIsLoading(false);
            return;
        }
        
        const profileFetch = async () => {
            try {
                const data = await searchProfile(searchUser);
                setProfile(data);
            } finally {
                setIsLoading(false);
            }
        }
        profileFetch();
    }, [searchUser])


    return (
        <div className="search-output-input">
            <input 
                type="text" 
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Gelan Mar"
                className="search-user-input"
            />

            {
                <div>
                    {profile.length === 0 && searchUser.trim() !== "" ?  (
                        <h2 className="error-message-search-user">Users not found.</h2>
                    ) : (
                        isLoading ? (
                            <ul className="skeleton-loading-state">
                                {[1, 2, 3].map((i) => (
                                    <li 
                                        key={i}
                                        className="content-loading-state"
                                    >
                                        <div className="profile-loading-state"/>
                                        <div className="description-loading-state"/>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul>
                                {searchUser.length === 0 ? (
                                    <li></li>
                                ) : (
                                    profile.map((prof) => (
                                        <li
                                            key={prof.id}
                                            className="users-content"
                                        >
                                                <UsersOutPut 
                                                    profile={`http://127.0.0.1:8000/avatars/${prof.avatar_url}`}
                                                    fullName={prof.full_name? prof.full_name : "guest"}
                                                    description={prof.about_me}
                                                />
                                        </li> 
                                    ))
                                )}
                            </ul>
                        )
                    )}
                </div>
            }
        </div>
    )

}




