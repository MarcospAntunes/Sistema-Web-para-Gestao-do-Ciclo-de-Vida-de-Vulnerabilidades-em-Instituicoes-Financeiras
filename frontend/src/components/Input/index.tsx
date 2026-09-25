"use client";

import { darkTheme, lightTheme } from "@/themes";
import { InputStyled, LabelStyle } from "./Input.style";
import { useTheme } from "@/hooks";
import InputProps from "./Input.type";

export default function Input({
  minLength,
  maxLength,
  disabled,
  type,
  placeholder,
  onClick,
  onChange,
  labelText,
  Icon,
  name,
  value,
}: InputProps) {
  const { theme } = useTheme();

  return (
    <LabelStyle theme={theme === "dark" ? darkTheme : lightTheme}>
      <p>{labelText}</p>
      <InputStyled theme={theme === "dark" ? darkTheme : lightTheme}>
        <Icon />
        <input
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
          type={type}
          onClick={onClick}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          value={value}
        />
      </InputStyled>
    </LabelStyle>
  );
}
