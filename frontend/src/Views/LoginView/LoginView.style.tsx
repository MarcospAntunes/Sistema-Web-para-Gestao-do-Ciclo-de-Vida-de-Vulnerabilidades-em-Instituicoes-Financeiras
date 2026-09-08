import { themeType } from "@/themes/theme.type";
import styled from "styled-components";

export const LoginViewStyle = styled.main<themeType>`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

