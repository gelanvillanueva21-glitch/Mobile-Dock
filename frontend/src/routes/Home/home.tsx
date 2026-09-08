import { DockSystem } from "../../layouts/Home/dock";
import { WallPapers } from "../../utilities/wallpaper";
import { GridApp } from "../../layouts/Home/grid_application";




export function Home() {

    return (
        <div className="home">
            <WallPapers/>
            <GridApp/>
            <DockSystem/>
        </div>
    )

}




