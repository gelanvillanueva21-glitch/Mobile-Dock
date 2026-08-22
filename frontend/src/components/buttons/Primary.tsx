

import type { ChildProps, Props }from "../../types/ButtonProps"


export function PrimaryButton({ onClick, children, context }: Props & ChildProps) {
    return (
        <button 
            onClick={onClick}
            className="primary"
        >
            {children}
            {context}
        </button>
    )
}


