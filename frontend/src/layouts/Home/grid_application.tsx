

import { Application as apps } from '../../types/Application';
import { IconButton } from '../../utilities/IconButton';


export function GridApp() {
    
    return (
        <>
            {apps.map((app) => (
                <IconButton 
                    onClick={app.onClick}
                    context={app.name}
                    alt={app.alt}
                    src={app.icon}
                />
            ))}

        </>
    )
}



