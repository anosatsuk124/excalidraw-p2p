import { LoggerStateAtom } from '@/atoms/debug';
import { useAtom } from 'jotai';
import { FC, ReactNode, useCallback, useEffect } from 'react';
import type { Logger } from '@/types/devlog';

export type DevLogProviderProps = {
  children: ReactNode;
};

const DevLogProvider: FC<DevLogProviderProps> = (props) => {
  const [loggerState] = useAtom(LoggerStateAtom);

  const info: Logger = useCallback(
    (...args) => {
      loggerState && console.info(args);
    },
    [loggerState]
  );

  const log: Logger = useCallback(
    (...args) => {
      loggerState && console.log(args);
    },
    [loggerState]
  );

  const error: Logger = useCallback(
    (...args) => {
      loggerState && console.error(args);
    },
    [loggerState]
  );

  const warn: Logger = useCallback(
    (...args) => {
      loggerState && console.warn(args);
    },
    [loggerState]
  );

  useEffect(() => {
    window.devlog = {
      info,
      log,
      error,
      warn,
    };

    devlog = window.devlog;
  }, [info, log, error, warn]);

  return <>{props.children}</>;
};

export default DevLogProvider;
