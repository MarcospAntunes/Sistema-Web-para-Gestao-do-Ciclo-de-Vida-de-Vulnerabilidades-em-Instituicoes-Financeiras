"use client";

import { createContext, useState } from "react";
import { ThemeContextType } from "./ThemeContext.type";

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});
ThemeContext.displayName = "ThemeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };