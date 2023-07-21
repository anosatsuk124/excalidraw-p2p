import { MainMenuLink, MainMenuProvider } from '@/Components/Utilities';
import { MainMenu as MainMenuBase } from '@excalidraw/excalidraw';

const MainMenu = () => {
  return (
    <MainMenuProvider>
      <MainMenuBase.DefaultItems.ToggleTheme />
      <MainMenuBase.DefaultItems.Export />
      <MainMenuBase.DefaultItems.SaveAsImage />
      <MainMenuLink href="/license">License</MainMenuLink>
    </MainMenuProvider>
  );
};

export default MainMenu;
