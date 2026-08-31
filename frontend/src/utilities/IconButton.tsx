

interface IconProps{
    onClick: () => void;
    context: string;
    src: string;
    alt: string;
}



export function IconButton({ onClick, context, src, alt }: IconProps) {
    
    return (
            <button
                onClick={onClick}
                className="app-icon"
            >
                <div className="app-icon-image">
                    <img 
                        src={src}
                        alt={alt}
                        className="icon-image-content"
                    />
                </div>
                <span className="app-title">
                    {context}
                </span>
            </button>
    )
}


