import { MouseEventHandler } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  text: string;
  disabled?: boolean | undefined;
  className?: string | undefined;
}


export default ButtonProps;