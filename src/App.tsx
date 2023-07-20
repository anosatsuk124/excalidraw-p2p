import { Excalidraw, Sidebar } from '@excalidraw/excalidraw';
import { Box, Button, Container } from '@mui/material';
import type {
  ExcalidrawProps,
  ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';
import { FC, useState } from 'react';

const ExcalidrawContainer: FC<
  ExcalidrawProps & { refCallback: (api: ExcalidrawImperativeAPI) => void }
> = (props) => {
  return (
    <Container>
      <Box
        sx={{
          border: '1.5px solid',
          width: '95vw',
          height: '95vh',
        }}
      >
        <Excalidraw {...props} ref={props.refCallback} />
      </Box>
    </Container>
  );
};

function App() {
  // TODO: jotai premitives
  const isCollaborating = false;

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();

  return (
    <Container
      sx={{
        display: 'grid',
        height: '100%',
        width: '100%',
        placeContent: 'center',
        overflow: 'hidden',
      }}
    >
      <ExcalidrawContainer
        refCallback={(api) => setExcalidrawAPI(api)}
        isCollaborating={isCollaborating}
        autoFocus={true}
        name="Excalidraw with WebRTC"
        renderTopRightUI={() => {
          return (
            <Button
              onClick={() => {
                excalidrawAPI?.toggleMenu('customSidebar');
              }}
            >
              Button
            </Button>
          );
        }}
        renderSidebar={() => {
          return (
            <Sidebar dockable={true}>
              <Sidebar.Header> Header </Sidebar.Header>
              <Button>Button</Button>
            </Sidebar>
          );
        }}
      />
    </Container>
  );
}

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

export default App;
