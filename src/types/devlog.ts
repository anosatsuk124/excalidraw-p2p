export type Logger = <T>(...args: T[]) => void;

export type DevLog = {
  info: Logger;
  log: Logger;
  error: Logger;
  warn: Logger;
};
