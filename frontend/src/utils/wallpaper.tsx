import { useEffect, useState } from "react";


import wallPaperOne from "../assets/icon/wallpaper/wallpaper-1.jpg";
import wallPaperTwo from "../assets/icon/wallpaper/wallpaper-2.jpg";
import wallPaperThree from "../assets/icon/wallpaper/wallpaper-3.jpg";
import wallPaperFour from "../assets/icon/wallpaper/wallpaper-4.jpg";
import wallPaperFive from "../assets/icon/wallpaper/wallpaper-5.jpg";


const wallPaperPicture = [
    wallPaperOne,
    wallPaperTwo,
    wallPaperThree,
    wallPaperFour,
    wallPaperFive
]


export function WallPapers() {
    const [wallPaper, setWallPaper] = useState("");

    useEffect(() => {
        const wallPaperPicked = wallPaperPicture[Math.floor(Math.random() * wallPaperPicture.length)];
        setWallPaper(wallPaperPicked);
    }, []);


    return (
        <div 
            className="wallpaper"
            style={{
                backgroundImage: `url(${wallPaper})`
            }}
        />
    )
}


