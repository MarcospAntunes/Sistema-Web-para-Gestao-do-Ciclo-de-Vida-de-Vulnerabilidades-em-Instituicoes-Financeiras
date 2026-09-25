"use client";

import { resolveTheme } from "@/themes";
import ButtonStyle from "./Button.style";
import { useTheme } from "@/hooks";
import ButtonProps from "./Button.type";

export default function Button({ type, text, onClick, disabled, className }: ButtonProps) {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  return (
    <ButtonStyle
      type={type}
      onClick={onClick}
      theme={currentTheme}
      disabled={disabled}
      className={className}
    >
      {text}
    </ButtonStyle>
  );
}
