

interface DescriptionProps{
    description?: string;
    guestDescription: string | null;
}


export function UserDescription({ description, guestDescription }: DescriptionProps) {

    return (
        <div id="user-description-box">
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
    )
}


