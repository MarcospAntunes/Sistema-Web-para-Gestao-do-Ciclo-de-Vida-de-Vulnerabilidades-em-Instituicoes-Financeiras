import { darkTheme, lightTheme } from "@/themes";

type Theme = "dark" | "light";

export function resolveTheme(theme: Theme) {
  return theme === "dark" ? darkTheme : lightTheme;
}
