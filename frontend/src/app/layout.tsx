import { ThemeProvider } from "@/contexts/ThemeContext";
import StyledComponentsRegistry from "@/lib/registry";
import "./reset.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-br">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
