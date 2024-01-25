import { FC } from 'react';
import { Sidebar } from '@excalidraw/excalidraw';
import { z } from 'zod';
import SidebarBase, { SidebarBasePropsSchema } from './Base';
import { Switch, FormControlLabel, FormGroup } from '@mui/material';
import { useAtom } from 'jotai';
import { LoggerStateAtom } from '@/atoms/debug';
import { useTranslation } from 'react-i18next';

export type GeneralSidebarProps = z.infer<typeof GeneralSidebarPropsSchema>;

export const GeneralSidebarPropsSchema = z
  .object({})
  .merge(SidebarBasePropsSchema);

const GeneralSidebar: FC<GeneralSidebarProps> = (props) => {
  const { t } = useTranslation();
  const [loggerState, setLoggerState] = useAtom(LoggerStateAtom);

  return (
    <SidebarBase onClose={props.onClose}>
      <Sidebar.Header>{t('general-settings')}</Sidebar.Header>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={loggerState}
              onChange={(e) => setLoggerState?.(e.target.checked)}
            />
          }
          label={t('toggle-debug-mode')}
        />
      </FormGroup>
    </SidebarBase>
  );
};

export default GeneralSidebar;
