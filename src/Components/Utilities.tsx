import styled from 'styled-components';
import {
  Button as ButtonBase,
  ToggleButtonGroup as ToggleButtonGroupBase,
  ToggleButton as ToggleButtonBase,
} from '@mui/material';
import { MainMenu, Sidebar } from '@excalidraw/excalidraw';

export const SidebarProvider = styled(Sidebar)``;
export const SidebarHeader = styled(Sidebar.Header)``;

export const MainMenuProvider = styled(MainMenu)``;
export const MainMenuLink = styled(MainMenu.ItemLink)``;

export const Button = styled(ButtonBase)``;

export const ToggleButtonGroup = styled(ToggleButtonGroupBase)``;

export const ToggleButton = styled(ToggleButtonBase)``;
