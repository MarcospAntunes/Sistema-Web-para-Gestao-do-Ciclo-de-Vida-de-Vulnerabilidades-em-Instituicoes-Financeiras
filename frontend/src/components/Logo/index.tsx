"use client";

import { darkTheme, lightTheme } from "@/themes";
import LogoStyle from "./Logo.style";
import { PiSecurityCamera } from "react-icons/pi";
import { useTheme } from "@/hooks";

export default function Logo() {
  const { theme } = useTheme();

  return (
    <LogoStyle theme={theme === "dark" ? darkTheme : lightTheme}>
      <span>
        <PiSecurityCamera />
      </span>
      <div>
        <p>VulnTrack</p>
        <p>Security Operations</p>
      </div>
    </LogoStyle>
  );
}
