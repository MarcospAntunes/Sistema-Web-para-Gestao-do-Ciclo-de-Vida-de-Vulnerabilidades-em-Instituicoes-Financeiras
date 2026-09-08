"use client";

import { ChangeThemeButton } from "@/components";
import { LoginViewStyle } from "./LoginView.style";
import { useTheme } from "@/hooks";
import { darkTheme, lightTheme } from "@/themes";

export default function LoginView() {
  const { theme } = useTheme();

  return (
    <LoginViewStyle theme={theme === "dark" ? darkTheme : lightTheme}>
      <ChangeThemeButton />
    </LoginViewStyle>
  );
}
