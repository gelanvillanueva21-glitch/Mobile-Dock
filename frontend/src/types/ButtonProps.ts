import React from "react";


export interface Props {
    onClick: () => void;
}

export interface ChildProps {
    children?: React.JSX.Element;
    context: string;
}

export interface ButtonType {
    type: "primary" | "secondary" | "tertiary";
}

