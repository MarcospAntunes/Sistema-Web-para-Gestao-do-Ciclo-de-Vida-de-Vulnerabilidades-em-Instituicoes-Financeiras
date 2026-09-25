"use client";

import { useTheme } from "@/hooks";
import {
  ChangeThemeButtonContainer,
  ChangeThemeButtonStyle,
} from "./ChangeThemeButton.style";
import { resolveTheme } from "@/themes";
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

export default function ChangeThemeButton() {
  const { setTheme, theme } = useTheme();

  const currentTheme = resolveTheme(theme);

  const handleThemeChange = (theme: "dark" | "light") => {
    setTheme(theme);
  };

  return (
    <ChangeThemeButtonContainer theme={currentTheme}>
      <ChangeThemeButtonStyle
        theme={currentTheme}
        className={theme === "light" ? "active" : "inactive"}
        onClick={() => handleThemeChange("light")}
      >
        <IoSunnyOutline />
      </ChangeThemeButtonStyle>
      <ChangeThemeButtonStyle
        theme={currentTheme}
        className={theme === "dark" ? "active" : "inactive"}
        onClick={() => handleThemeChange("dark")}
      >
        <FaRegMoon />
      </ChangeThemeButtonStyle>
    </ChangeThemeButtonContainer>
  );
}
