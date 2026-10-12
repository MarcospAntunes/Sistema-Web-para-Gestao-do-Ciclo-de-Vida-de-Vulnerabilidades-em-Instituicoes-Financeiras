import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const DashboardLayoutStyle = styled.div<themeType>`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  overflow: hidden;

  .dashboard-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .dashboard-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
  }
`;
