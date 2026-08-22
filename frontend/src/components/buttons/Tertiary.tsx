

import type { ChildProps, Props }from "../../types/ButtonProps"


export function TertiaryButton({ onClick, children, context }: Props & ChildProps) {

    return (

        <button
            onClick={onClick}
            className="tertiary"
        >
            {children}
            {context}
        </button>
    )

}



