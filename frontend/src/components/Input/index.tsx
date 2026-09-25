"use client";

import { resolveTheme } from "@/themes";
import { InputStyled, LabelStyle, ErrorMessage } from "./Input.style";
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
  error,
}: InputProps) {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  return (
    <LabelStyle theme={currentTheme}>
      <p>{labelText}</p>
      <InputStyled theme={currentTheme} $hasError={!!error}>
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
      {error && <ErrorMessage theme={currentTheme}>{error}</ErrorMessage>}
    </LabelStyle>
  );
}
