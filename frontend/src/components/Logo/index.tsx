"use client";

import { resolveTheme } from "@/themes";
import LogoStyle from "./Logo.style";
import { PiSecurityCamera } from "react-icons/pi";
import { useTheme } from "@/hooks";

export default function Logo() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  return (
    <LogoStyle theme={currentTheme}>
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
