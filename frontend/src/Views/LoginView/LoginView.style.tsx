import { themeType } from "@/themes/theme.type";
import styled from "styled-components";

export const LoginViewStyle = styled.main<themeType>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.background};

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding: calc(0.25rem * 10);
  }

  section:first-of-type {
    display: none;
    align-items: start;
    position: relative;
    color: ${({ theme }) => theme.foreground};
    border-right: 1px solid ${({ theme }) => theme.border};

    background:
      radial-gradient(
        ellipse 80% 60% at 100% 0%,
        ${({ theme }) => `${theme.primary}4D`} 0%,
        ${({ theme }) => `${theme["primary-soft"]}80`} 35%,
        transparent 75%
      ),
      ${({ theme }) => theme.sidebar};

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      span {
        color: ${({ theme }) => theme.primary};
      }
    }

    p {
      font-size: 0.875rem;
      line-height: calc(1.25 / 0.875);
      color: ${({ theme }) => theme["muted-foreground"]};
      max-width: 450px;
    }
  }

  section:last-of-type {
    h2 {
      font-size: 30px; 
      font-weight: 700;
      line-height: calc(2.25 / 1.875);
      color: ${({theme}) => theme.foreground}
    }

    p {
      margin-top: 4px;
      font-size: 14px;
      line-height: calc(2.25 / .875);
      color: ${({theme}) => theme["muted-foreground"]}
    }
    & > div:first-of-type {
      width: 100%;
    }
    & > div:last-of-type {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    form {
      width: 100%;
      max-width: 450px;
      height: 450px;
      margin-top: 24px;

      & div:last-of-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 16px;
        padding-top: 4px;
      }

      #remember-me-label {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        height: 40px;
        font-size: 12px;
        line-height: calc(1 / 0.75);
        color: ${({ theme }) => theme["muted-foreground"]};
        cursor: pointer;
        
        & > input {
          width: 16px;
          height: 16px;

          appearance: none;
          -webkit-appearance: none;

          background-color: ${({ theme }) => theme.input};
          border: 1px solid ${({ theme }) => theme["muted-foreground"]};
          border-radius: 3px;

          cursor: pointer;
        }

        & > input:hover {
          border-color: ${({theme}) => theme["muted-foreground"]}
        }

        & > input:checked {
          background-color: ${({ theme }) => theme.primary};
          border-color: ${({ theme }) => theme.primary};
        }

        & > input:checked::after {
          content: "✓";
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${({ theme }) => theme["primary-foreground"]};
          font-size: 12px;
          font-weight: bold;
        }
      }

      a {
        height: 40px;
        align-content: center;
        font-weight: 700;
        font-size: 12px;
        text-align: center;
        line-height: calc(1 / .75);
        color: ${({theme}) => theme.primary};
        transition: text-decoration 0.3s ease;
        appearance: button;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    & .button-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      width: 100%;
      max-width: 450px;
      max-height: 50px;
      margin-top: 28px;
      padding: 4px;
      background-color: ${({theme}) => theme.secondary};
      border: 1px solid ${({theme}) => theme.border};
      border-radius: 6px;
    }
  }

  @media screen and (min-width: 541px) {
    section:first-of-type {
      display: flex;
    }
  }
`;
