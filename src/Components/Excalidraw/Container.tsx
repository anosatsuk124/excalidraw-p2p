import { Excalidraw } from '@excalidraw/excalidraw';
import type {
  ExcalidrawProps,
  ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

export type WindowRect = {
  width: number;
  height: number;
};

export type ExcalidrawBoxProps = {
  $windowRect: WindowRect;
  $scale?: number;
};

const ExcalidrawBox = styled.div<ExcalidrawBoxProps>`
  ${(props) => {
    const { $windowRect: windowRect, $scale: $scale } = props;
    const scale = $scale! ? $scale : 1;
    const { width, height } = windowRect;

    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    return `
      width: ${scaledWidth}px;
      height: ${scaledHeight}px;
    `;
  }}
`;

export type ExcalidrawContainerProps = ExcalidrawProps & {
  refCallback: (api: ExcalidrawImperativeAPI) => void;
} & Omit<ExcalidrawBoxProps, '$windowRect'>;

export const ExcalidrawContainer: FC<ExcalidrawContainerProps> = (props) => {
  const scale = useMemo(
    () => (props.$scale ? props.$scale : 1),
    [props.$scale]
  );

  const [windowRect, setWindowRect] = useState<WindowRect>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onResize = useCallback(() => {
    setWindowRect({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  return (
    <ExcalidrawBox $scale={scale} $windowRect={windowRect}>
      <Excalidraw {...props} ref={props.refCallback}>
        {props.children}
      </Excalidraw>
    </ExcalidrawBox>
  );
};

export default ExcalidrawContainer;
