import create from 'zustand';
import { showNotification } from '@mantine/notifications';
import { db } from '../db/dexie';

interface History {
  copyLink: (url: string) => void;
  deleteVideo: (id: number) => void;
  clearHistory: (historyLength: number | undefined) => void;
  trimTitle: (str: string) => string;
}

export const useHistory = create<History>((set) => ({
  copyLink: (url: string) => {
    navigator.clipboard.writeText(url);
    showNotification({
      title: 'Yes!',
      message: 'Url copied.',
      color: 'grape',
    });
  },
  deleteVideo: (id: number) => {
    db.history.delete(id);
  },
  clearHistory: (historyLength: number | undefined) => {
    if (historyLength === 0) {
      showNotification({
        title: 'Warning',
        message: 'No history to be deleted.',
        color: 'yellow',
      });
      return null;
    }
    db.history.clear();
  },
  trimTitle: (str: string) => {
    if (str.length < 16) return str;

    return str.substring(0, 16) + '..'.trim();
  },
}));
