import { Sidebar } from '@excalidraw/excalidraw';
import { FC } from 'react';
import { z } from 'zod';
import type { ReactNode } from 'react';
import { Box } from '@mui/material';

export const SidebarBasePropsSchema = z.object({
  onClose: z.function().args().returns(z.void()),
});

export type SidebarBaseProps = z.infer<typeof SidebarBasePropsSchema> & {
  children?: ReactNode;
};

const SidebarBase: FC<SidebarBaseProps> = (props) => {
  return (
    <Sidebar dockable={true} onClose={props.onClose}>
      <Box sx={{ p: 2 }}>{props.children}</Box>
    </Sidebar>
  );
};

export default SidebarBase;
