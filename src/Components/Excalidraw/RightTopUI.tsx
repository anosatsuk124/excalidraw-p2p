import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { FC, useCallback } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@/Components/Utilities';
import { SidebarVariant, SidebarVariantSchema } from './Sidebar';
import { z } from 'zod';

export const RightTopUIPropsScheme = z.object({
  setSidebarVariant: z.function().args(SidebarVariantSchema).returns(z.void()),
  setToggleState: z.function().args(z.boolean()).returns(z.void()),
  toggleState: z.boolean(),
});

export type RightTopUIProps = z.infer<typeof RightTopUIPropsScheme> & {
  excalidrawAPI: ExcalidrawImperativeAPI;
};

const RightTopUI: FC<RightTopUIProps> = (props) => {
  const excalidrawAPI = props.excalidrawAPI;

  const sidebarToggle = useCallback(
    (variant: SidebarVariant) => {
      if (excalidrawAPI && !props.toggleState) {
        props.setToggleState(props.toggleState);
        props.setSidebarVariant(variant);
        excalidrawAPI.toggleMenu('customSidebar');
      }
    },
    [excalidrawAPI, props]
  );

  return (
    <ToggleButtonGroup
      exclusive
      onChange={(_, value: SidebarVariant) => sidebarToggle(value)}
      disabled={props.toggleState}
    >
      <ToggleButton value="general">General</ToggleButton>
      <ToggleButton value="collaboration">Collaboration</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default RightTopUI;
