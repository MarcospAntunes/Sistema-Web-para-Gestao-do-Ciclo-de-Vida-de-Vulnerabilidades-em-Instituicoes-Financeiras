import { darkTheme, lightTheme } from "@/themes";

type Theme = "dark" | "light";

/**
 * Retorna o objeto de tema (darkTheme/lightTheme) com base no nome do tema atual.
 */
export function resolveTheme(theme: Theme) {
  return theme === "dark" ? darkTheme : lightTheme;
}
