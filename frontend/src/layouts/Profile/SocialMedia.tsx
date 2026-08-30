


import facebookIcon from "../../assets/icon/SocialMediaIcon/facebook-color-svgrepo-com.svg";
import instagramIcon from "../../assets/icon/SocialMediaIcon/instagram-svgrepo-com.svg";
import linkedinIcon from "../../assets/icon/SocialMediaIcon/linkedin-svgrepo-com.svg";


interface SocialMediaUrlProps{
    facebook?: string;
    instagram?: string;
    linkedin?: string;
}


export function SocialMediaButton({ facebook, instagram, linkedin }: SocialMediaUrlProps) {
    const socials = [
        {
            name: "Facebook",
            url: facebook,
            icon: facebookIcon,
            fallback: "https://facebook.com"
        },
        {
            name: "Instagram",
            url: instagram,
            icon: instagramIcon,
            fallback: "https://instagram.com"
        },
        {
            name: "Linkedin",
            url: linkedin,
            icon: linkedinIcon,
            fallback: "https://linkedin.com"
        }
    ]


    function clickHandler(socialMedia: string | undefined, fallback: string) {
        window.open(
            socialMedia || fallback,
            "_blank",
            "noopener,noreferrer"
        )
    }

    return (
        <div className="social-media-boc">
            <h2 className="media-header">
                Social Media:
            </h2>
            
            <div className="social-media-button-box">
                {socials.map((social) => (
                    <button
                        key={social.name}
                        onClick={() => clickHandler(social.url, social.fallback)}
                        className="social-media-button"
                    >
                        <img 
                            src={social.icon}
                            alt={social.name}
                            className="social-media-icon"
                        />
                    </button>
                ))}
            </div>
            
        </div>
    )

}


