

import { IconButton } from "../../components/buttons/Icon";
import profileIcon from "../../assets/icon/profile-svgrepo-com.svg";
import settingIcon from "../../assets/icon/settings-2-svgrepo-com.svg";


export function DockSystem() {

    function appRoute(route: "profile" | "settings") {
        if (route === "settings") {

        }

        if (route === "profile") {

        }
    }

    return (
        <div className="dock-system-container">
            <IconButton 
                onClick={() => appRoute("profile")}
                context="Profile"
                src={profileIcon}
                alt="Profile"
            />
            <IconButton 
                onClick={() => appRoute("settings")}
                context="Settings"
                src={settingIcon}
                alt="Settings"
            />
        </div>
    )

}



