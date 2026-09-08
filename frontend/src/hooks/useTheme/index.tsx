import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

function useTheme() {
  const { setTheme, theme } = useContext(ThemeContext);

  return { setTheme, theme };
}

export default useTheme;