import type { DevLog } from '@/types/devlog';

declare global {
  interface Window {
    devlog: DevLog;
  }
  let devlog: DevLog;
}
