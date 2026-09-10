

import { useNavigate } from 'react-router-dom';
import { Application as apps } from '../../types/Application';
import { IconButton } from '../../utilities/IconButton';


export function GridApp() {
    
    const navigate = useNavigate();

    return (
        <div className='flex w-fit flex-wrap gap-3 p-2'>
            {apps.map((app) => (
                <IconButton 
                    key={app.name}
                    onClick={() => navigate(app.url)}
                    context={app.name}
                    alt={app.alt}
                    src={app.icon}
                />
            ))}
        </div>
    )
}



