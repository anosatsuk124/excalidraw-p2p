import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import ExcalidrawContainer from './Excalidraw/Container';
import { useCallback, useState } from 'react';
import Sidebar, { SidebarVariant } from './Excalidraw/Sidebar';
import RightTopUI from './Excalidraw/RightTopUI';
import MainMenu from './Excalidraw/MainMenu';

export const ExcalidrawMain = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();

  const [sidebarVariant, setSidebarVariant] =
    useState<SidebarVariant>('general');

  const [toggleState, setToggleState] = useState<boolean>(false);

  const onClose = useCallback(() => setToggleState(false), []);

  return (
    <ExcalidrawContainer
      refCallback={(api) => setExcalidrawAPI(api)}
      autoFocus={true}
      name="Excalidraw with WebRTC"
      renderTopRightUI={() => (
        <RightTopUI
          toggleState={toggleState}
          setToggleState={setToggleState}
          setSidebarVariant={setSidebarVariant}
          excalidrawAPI={excalidrawAPI!}
        />
      )}
      renderSidebar={() => {
        return <Sidebar variant={sidebarVariant} variantProps={{ onClose }} />;
      }}
    >
      <MainMenu />
    </ExcalidrawContainer>
  );
};

/*
export interface ExcalidrawProps {
    // Render UI elements
    renderTopRightUI?: (isMobile: boolean, appState: AppState) => JSX.Element | null;
    renderSidebar?: () => JSX.Element | null;

    onChange?: (elements: readonly ExcalidrawElement[], appState: AppState, files: BinaryFiles) => void;
    initialData?: ExcalidrawInitialDataState | null | Promise<ExcalidrawInitialDataState | null>;
    excalidrawRef?: ForwardRef<ExcalidrawAPIRefValue>;
    isCollaborating?: boolean;
    onPointerUpdate?: (payload: {
        pointer: {
            x: number;
            y: number;
        };
        button: "down" | "up";
        pointersMap: Gesture["pointers"];
    }) => void;
    onPaste?: (data: ClipboardData, event: ClipboardEvent | null) => Promise<boolean> | boolean;




    langCode?: Language["code"];
    onPointerDown?: (activeTool: AppState["activeTool"], pointerDownState: PointerDownState) => void;
    generateIdForFile?: (file: File) => string | Promise<string>;
    UIOptions?: Partial<UIOptions>;
    renderCustomStats?: (elements: readonly NonDeletedExcalidrawElement[], appState: AppState) => JSX.Element;

    viewModeEnabled?: boolean;
    zenModeEnabled?: boolean;
    gridModeEnabled?: boolean;
    libraryReturnUrl?: string;
    name?: string;
    theme?: Theme;
    detectScroll?: boolean;
    handleKeyboardGlobally?: boolean;
    onLibraryChange?: (libraryItems: LibraryItems) => void | Promise<any>;
    autoFocus?: boolean;
    onLinkOpen?: (element: NonDeletedExcalidrawElement, event: CustomEvent<{
        nativeEvent: MouseEvent | React.PointerEvent<HTMLCanvasElement>;
    }>) => void;
    onScrollChange?: (scrollX: number, scrollY: number) => void;
    children?: React.ReactNode;
}
 */

export default ExcalidrawMain;
