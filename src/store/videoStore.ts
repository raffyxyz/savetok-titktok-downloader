import create from 'zustand';
import axios from 'axios';

interface Video {
  video: object;
  loading: boolean;
  notTiktokLink: boolean;
  fetchVideo: (url: string) => void;
}

export const useVideo = create<Video>((set) => ({
  video: {},
  url: '',
  loading: false,
  notTiktokLink: false,
  fetchVideo: async (url: string) => {
    try {
      set({ loading: true, notTiktokLink: false, video: {} });

      const result = await axios.get(
        `https://www.tikwm.com/api/?url=${url}?hd=1`
      );

      // Checks if the response is undefined
      if (typeof result.data.data !== 'undefined') {
        set({ video: result.data.data });
      } else {
        set({ notTiktokLink: true });
      }
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
