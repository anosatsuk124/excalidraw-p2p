import { FC } from 'react';
import { Button, SidebarHeader } from '@/Components/Utilities';
import { z } from 'zod';
import SidebarProviderBase, { SidebarBasePropsSchema } from './Base';

export type GeneralSidebarProps = z.infer<typeof GeneralSidebarPropsSchema>;

export const GeneralSidebarPropsSchema = z
  .object({})
  .merge(SidebarBasePropsSchema);

const GeneralSidebar: FC<GeneralSidebarProps> = (props) => {
  return (
    <SidebarProviderBase onClose={props.onClose}>
      <SidebarHeader>General Settings</SidebarHeader>
      <Button>Button</Button>
    </SidebarProviderBase>
  );
};

export default GeneralSidebar;
