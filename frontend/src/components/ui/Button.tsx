import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    newStyles?: string;
}

const Button = ({children, newStyles, ...rest}: IProps) => {
    return (
        <button className={`hover:brightness-50 transition font-semibold w-full p-2 cursor-pointer rounded-2xl ${newStyles}`} {...rest}>{children}</button>
    )
}

export default Button;