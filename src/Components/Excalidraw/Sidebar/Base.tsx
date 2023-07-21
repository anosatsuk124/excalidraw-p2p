import { SidebarProvider } from '@/Components/Utilities';
import { FC } from 'react';
import { z } from 'zod';
import type { ReactNode } from 'react';

export const SidebarBasePropsSchema = z.object({
  onClose: z.function().returns(z.void()),
});

export type SidebarBaseProps = z.infer<typeof SidebarBasePropsSchema> & {
  children?: ReactNode;
};

const SidebarProviderBase: FC<SidebarBaseProps> = (props) => {
  return (
    <SidebarProvider dockable={true} onClose={props.onClose}>
      {props.children}
    </SidebarProvider>
  );
};

export default SidebarProviderBase;
