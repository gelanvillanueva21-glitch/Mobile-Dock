

interface DescriptionProps{
    description?: string;
    guestDescription: string | null;
}


export function UserDescription({ description, guestDescription }: DescriptionProps) {

    return (
        <div className="profile-info-box">
            <div id="user-description-box">
                <h1 className="about-me-header">About Me:</h1>
                    {description ? (
                        <p id="user-description-profile">
                            {description}
                        </p>
                    ) : (
                        <h2 id="temporary-description">
                            {guestDescription}
                        </h2>
                    )}
            </div>
            <div id="user-statistics-box">
                <h1 className="statistic-header">
                    Statistics:
                </h1>

                {/* Statististics layout soon */}

            </div>
        </div>
    )
}


