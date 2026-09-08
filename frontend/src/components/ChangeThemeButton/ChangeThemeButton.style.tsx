import { themeType } from "@/themes/theme.type";
import styled from "styled-components";

const ChangeThemeButtonContainer = styled.div<themeType>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 70px;
  height: 40px;
  background-color: ${({ theme }) => theme["secondary"]};
  border: 1px solid ${({ theme }) => theme["border"]};
  border-radius: 5px;
  transition: all 0.1s ease-in-out;

  .active {
    background-color: ${({ theme }) => theme["card"]} !important;

    svg {
      color: ${({ theme }) => theme["primary"]} !important;
      stroke: ${({ theme }) => theme["primary"]} !important;
    }
  }

  .inactive {

    svg {
      color: ${({ theme }) => theme["muted-foreground"]} !important;
      stroke: ${({ theme }) => theme["muted-foreground"]} !important;
    }
  }
`;

const ChangeThemeButtonStyle = styled.button<themeType>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;

  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
    
  }
`;

export { ChangeThemeButtonContainer, ChangeThemeButtonStyle };