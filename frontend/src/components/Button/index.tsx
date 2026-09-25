"use client";

import { darkTheme, lightTheme } from "@/themes";
import ButtonStyle from "./Button.style";
import { useTheme } from "@/hooks";
import ButtonProps from "./Button.type";

export default function Button({ type, text, onClick, disabled, className }: ButtonProps) {
  const { theme } = useTheme();

  return (
    <ButtonStyle
      type={type}
      onClick={onClick}
      theme={theme === "dark" ? darkTheme : lightTheme}
      disabled={disabled}
      className={className}
    >
      {text}
    </ButtonStyle>
  );
}
