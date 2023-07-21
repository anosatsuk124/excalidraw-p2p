import { FC } from 'react';
import { match } from 'ts-pattern';
import { z } from 'zod';
import CollaborationSidebar, {
  CollaborationSidebarPropsSchema,
} from './Sidebar/Collaboration';
import GeneralSidebar, { GeneralSidebarPropsSchema } from './Sidebar/General';

export const SidebarVariantSchema = z.enum(['collaboration', 'general']);

export type SidebarVariant = z.infer<typeof SidebarVariantSchema>;

export const SidebarVariantPropsSchema = z.union([
  CollaborationSidebarPropsSchema,
  GeneralSidebarPropsSchema,
]);

export type SidebarVariantProps = z.infer<typeof SidebarVariantPropsSchema>;

export const SidebarProrps = z.object({
  variant: SidebarVariantSchema,
  variantProps: SidebarVariantPropsSchema,
});

export type SidebarProps = z.infer<typeof SidebarProrps>;

export const Sidebar: FC<SidebarProps> = (props) => {
  return match(props.variant)
    .with('collaboration', () => {
      const _props = CollaborationSidebarPropsSchema.parse(props.variantProps);
      return <CollaborationSidebar {..._props} />;
    })
    .with('general', () => {
      const _props = GeneralSidebarPropsSchema.parse(props.variantProps);
      return <GeneralSidebar {..._props} />;
    })
    .exhaustive();
};

export default Sidebar;
