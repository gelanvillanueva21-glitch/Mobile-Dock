

import type { ChildProps, Props }from "../../types/ButtonProps"


export function SecondaryButton({ onClick, children, context }: Props & ChildProps) {

    return (
        <button
            onClick={onClick}
            className="secondary"
        >
            {children}
            {context}
        </button>
    )

}




