

interface OutputProps {
    profile: string;
    fullName: string | "guest";
    description: string;
}


export function Output({ profile, fullName, description }: OutputProps) {
    return (
        <button>
            <img 
                src={profile} 
                alt="Profile" 
                className="profile-icon-search"
            />
            <div className="short-description">
                <h3>{fullName}</h3>
                <p>
                    {
                        description.length > 20
                            ? description.slice(0, 20) + "..."
                            : description
                    }
                </p>
            </div>
        </button>
    )
}


