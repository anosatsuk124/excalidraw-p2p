import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { FC, useCallback } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@/Components/Utilities';
import { SidebarVariant, SidebarVariantSchema } from './Sidebar';
import { z } from 'zod';
import { LiveCollaborationTrigger } from '@excalidraw/excalidraw';

export const RightTopUIPropsSchema = z.object({
  setSidebarVariant: z.function().args(SidebarVariantSchema).returns(z.void()),
  setToggleState: z.function().args(z.boolean()).returns(z.void()),
  toggleState: z.boolean(),
});

export type RightTopUIProps = z.infer<typeof RightTopUIPropsSchema> & {
  excalidrawAPI: ExcalidrawImperativeAPI;
};

const RightTopUI: FC<RightTopUIProps> = (props) => {
  const excalidrawAPI = props.excalidrawAPI;

  const sidebarToggle = useCallback(
    (variant: SidebarVariant) => {
      if (excalidrawAPI && !props.toggleState) {
        props.setToggleState(true);
        props.setSidebarVariant(variant);
        excalidrawAPI.toggleMenu('customSidebar');
      }
    },
    [excalidrawAPI, props]
  );

  return (
    <>
      <LiveCollaborationTrigger
        isCollaborating={false}
        onSelect={() => console.log('nyya')}
      />
      <ToggleButtonGroup
        exclusive
        onChange={(_, value: SidebarVariant) => sidebarToggle(value)}
        disabled={props.toggleState}
        size="small"
      >
        <ToggleButton size="small" value="general">
          General
        </ToggleButton>
        <ToggleButton size="small" value="collaboration">
          Collaboration
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default RightTopUI;
