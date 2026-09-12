

import { useNavigate } from "react-router-dom";
import guestIcon from "../../assets/icon/guest-profile.svg";

interface OutputProps {
    profile: string | null;
    fullName: string | "guest";
    description: string;
    id: number;
}


export function UsersOutPut({ profile, fullName, description, id }: OutputProps) {
    const navigate = useNavigate();

    return (
        <button 
            className="users-profile-buttons"
            onClick={() => navigate(`/profile/${id}`)}
        >
            <img 
                src={profile? `http://127.0.0.1:8000/avatars/${profile}` : guestIcon} 
                alt="Profile" 
                className="profile-icon-search"
            />
            <div className="short-description">
                <h3>{fullName}</h3>
                <p>
                    {
                        description? 
                            ( description.length > 20
                            ? description.slice(0, 20) + "..."
                            : description ) : (
                                "User have not edit yet."
                            )
                    }
                </p>
            </div>
        </button>
    )
}


