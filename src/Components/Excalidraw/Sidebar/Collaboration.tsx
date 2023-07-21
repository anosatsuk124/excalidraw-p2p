import { FC } from 'react';
import { Button, SidebarHeader } from '@/Components/Utilities';
import { z } from 'zod';
import SidebarProviderBase, { SidebarBasePropsSchema } from './Base';

export type CollaborationSidebarProps = z.infer<
  typeof CollaborationSidebarPropsSchema
>;

export const CollaborationSidebarPropsSchema = z
  .object({})
  .merge(SidebarBasePropsSchema);

const CollaborationSidebar: FC<CollaborationSidebarProps> = (props) => {
  return (
    <SidebarProviderBase onClose={props.onClose}>
      <SidebarHeader>Collaboration Settings</SidebarHeader>
      <Button>Button</Button>
    </SidebarProviderBase>
  );
};

export default CollaborationSidebar;
