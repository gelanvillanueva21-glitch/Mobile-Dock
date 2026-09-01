

import { useEffect, useState } from "react";
import { UsersOutPut } from "./SearchOutput";
import { searchProfile } from "../../services/profile";
import type { ProfileInfo } from "../../types/Profile";


export function SearchUser() {
    const [searchUser, setSearchUser] = useState("");
    const [profile, setProfile] = useState<ProfileInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showResult, setShowResult] = useState(false);


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
                onChange={(e) => {
                    setSearchUser(e.target.value)
                    setShowResult(e.target.value.trim() !== "")
                }}
                placeholder="Search..."
                className="search-user-input"
            />

            {
                <div className="result-container">
                    {profile.length === 0 && searchUser.trim() !== "" ?  (
                        <h2 className="error-message-search-user">Users not found.</h2>
                    ) : (
                        isLoading ? (
                            <div className="skeleton-box-state">
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
                            </div>
                        ) : (
                            <div className={showResult? "search-result-box visible" : "search-result-box"}>
                                <ul className={showResult? "search-result-output visible" : "search-result-output"}>
                                    {profile.length > 0 && 
                                        (profile.map((prof) => (
                                        <li
                                            key={prof.id}
                                            className="users-content"
                                        >
                                            <UsersOutPut
                                            profile={ prof.avatar_url? prof.avatar_url : null }
                                            fullName={prof.full_name? prof.full_name : "guest"}
                                            description={prof.about_me}
                                                />
                                        </li> 
                                    )))}
                                </ul>
                            </div>
                        )
                    )}
                </div>
            }
        </div>
    )

}




