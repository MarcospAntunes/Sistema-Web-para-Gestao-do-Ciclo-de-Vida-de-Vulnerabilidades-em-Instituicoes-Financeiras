import { themeType } from "@/themes/theme.type";
import styled from "styled-components";

const LabelStyle = styled.label<themeType>`
  display: block;
  font-size: 12px;
  line-height: calc(1.5 / 0.75);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.foreground};
  margin-bottom: 16px !important;

  & > p {
    margin-bottom: 6px;
  }
`;

const InputStyled = styled.span<themeType & { $hasError?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  gap: 8px;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.critical : theme.input)};
  border-radius: 8px;
  padding: 12px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus-within {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.critical : theme.primary)} !important;
    box-shadow: 0 0 0 2px ${({ theme, $hasError }) => ($hasError ? theme["critical-soft"] : theme["primary-soft"])};
  }

  input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

const ErrorMessage = styled.p<themeType>`
  color: ${({ theme }) => theme.critical} !important;
  font-size: 0.75rem;
  margin-top: 4px;
  font-weight: 400;
  letter-spacing: normal;
`;

export { InputStyled, LabelStyle, ErrorMessage };

