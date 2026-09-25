import { themeType } from "@/themes/theme.type";
import styled from "styled-components";

const LogoStyle = styled.div<themeType>`
  display: flex;
  align-items: center; 
  justify-content: center;
  gap: calc(0.25rem * 2);
  span {
    display: grid;
    align-items: center;
    justify-content: center;
    width: calc(0.25rem * 10);
    height: calc(0.25rem * 10);
    background-color: ${({ theme }) => theme.primary} !important;
    color: ${({ theme }) => theme["primary-foreground"]} !important;
    border-radius: 0.375rem;

    svg {
      width: calc(0.25rem * 5);
      height: calc(0.25rem * 5);
    }
  }

  p:first-of-type {
    font-size: 18px !important;
    font-weight: 700;
    line-height: calc(1.75 / 1.125);
    color: ${({ theme }) => theme.foreground} !important;
  }

  p:last-of-type {
    font-size: 9px !important;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme["muted-foreground"]} !important;
    text-transform: uppercase;
  }
`;

export default LogoStyle;
