

import { PrimaryButton } from './Primary';
import type { ButtonType, ChildProps }from "../../types/ButtonProps";
import { SecondaryButton } from './Secondary';
import { TertiaryButton } from './Tertiary';


export function Button({ children, context, type }: ChildProps & ButtonType ) {

    function clickHandler() {

    }

    return (
        <>

            {type === "primary" && (
                <PrimaryButton onClick={clickHandler} context={context}>
                    {children}
                </PrimaryButton>
            )}
            {type === "secondary" && (
                <SecondaryButton onClick={clickHandler} context={context}>
                    {children}
                </SecondaryButton>
            )}
            {type === "tertiary" && (
                <TertiaryButton onClick={clickHandler} context={context}>
                    {children}
                </TertiaryButton>
            )}

        </>
    )

}



