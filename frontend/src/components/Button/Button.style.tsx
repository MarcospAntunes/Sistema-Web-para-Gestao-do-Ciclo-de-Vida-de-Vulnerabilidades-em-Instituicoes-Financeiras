import { themeType } from "@/themes/theme.type";
import styled from "styled-components";

const ButtonStyle = styled.button<themeType>`
  color: ${({ theme }) => theme["primary-foreground"]};
  font-size: 14px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 6px;
  width: 100%;
  height: 44px;
  cursor: pointer;
  appearance: button;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({theme}) => theme["primary-hover"]};
  }

  &.disabled {
    background-color: ${({theme}) => theme.secondary};
    color: ${({theme}) => theme["muted-foreground"]};
  }

  &.active {
    color: ${({theme}) => theme.primary} !important;
    background-color: ${({ theme }) => theme.card} !important;
  }
`;

export default ButtonStyle;
