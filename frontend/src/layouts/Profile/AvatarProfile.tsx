


interface AvatarProps{
    profile: string;
    fullName: string | null;
}


export function Avatar({ profile, fullName }: AvatarProps) {

    return (
        <div className="profile-container">
            <div id="avatar-image-box">
                <img 
                    src={profile}
                    alt={`${fullName}'s Profile`}
                    id="user-profile-picture" 
                />
            </div>
            <div id="user-name-box">
                <h2 id="user-full-name">{fullName}</h2>
            </div>
        </div>
    )

}



