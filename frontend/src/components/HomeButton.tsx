

import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/icon/home-icon-silhouette-svgrepo-com.svg";



export function HomeButton() {
    const navigate = useNavigate();

    return (
        <button
        type="button"
        aria-label="Home"
            className="home-button"
            onClick={() => navigate("/")}>
            <img 
                src={homeIcon} 
                alt="Home Icon" 
            />
        </button>
    )
}


