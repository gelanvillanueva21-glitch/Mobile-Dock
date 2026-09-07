

import { Chess } from "../routes/Chess/chess";
import { Messenger } from "../routes/Messenger/messenger";
import { FlappyBird } from "../routes/FlappyBird/flappybird";
import { Setting } from "../routes/Setting_/setting";
import { Profile } from "../routes/Profile/Profile";



export const Application = [
    {
        name: "Chess",
        icon: "",
        alt: "Chess Icon",
        onClick: Chess
    },
    {
        name: "Messenger",
        icon: "",
        alt: "Messenger Icon",
        onClick: Messenger
    },
    {
        name: "Flappy Bird",
        icon: "",
        alt: "Flappy Bird Icon",
        onClick: FlappyBird
    },
    {
        name: "Settings",
        icon: "",
        alt: "Settings Icon",
        onClick: Setting
    },
    {
        name: "Profile",
        icon: "",
        alt: "Settings Icon",
        onClick: Profile
    }
]

