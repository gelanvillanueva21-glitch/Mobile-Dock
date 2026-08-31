

import { useNavigate } from "react-router-dom";
import { IconButton } from "../../utilities/IconButton";
import profileIcon from "../../assets/icon/profile-svgrepo-com.svg";
import settingIcon from "../../assets/icon/settings-2-svgrepo-com.svg";
import homeIcon from "../../assets/icon/home-icon-silhouette-svgrepo-com.svg";


export function DockSystem() {

    const navigate = useNavigate();

    return (
        <div className="dock-system-container">
            <IconButton 
                onClick={() => navigate("/profile")}
                context="Profile"
                src={profileIcon}
                alt="Profile"
            />
            <IconButton 
                onClick={() => navigate("/")}
                context="Home"
                src={homeIcon}
                alt="Home"
            />
            <IconButton 
                onClick={() => navigate("settings")}
                context="Settings"
                src={settingIcon}
                alt="Settings"
            />
        </div>
    )

}



