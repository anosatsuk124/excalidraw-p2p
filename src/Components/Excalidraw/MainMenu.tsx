import { MainMenu as MainMenuBase } from '@excalidraw/excalidraw';

const MainMenu = () => {
  return (
    <MainMenuBase>
      <MainMenuBase.DefaultItems.ToggleTheme />
      <MainMenuBase.DefaultItems.Export />
      <MainMenuBase.DefaultItems.SaveAsImage />
      <MainMenuBase.ItemLink href="/license">License</MainMenuBase.ItemLink>
    </MainMenuBase>
  );
};

export default MainMenu;
