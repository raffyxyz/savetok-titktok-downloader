import create from "zustand";
import axios from "axios";
import { db } from "../db/dexie";

interface Video {
  video: any;
  loading: boolean;
  notTiktokLink: boolean;
  fetchVideo: (url: string) => void;
}

export const useVideo = create<Video>((set, get) => ({
  video: {},
  url: "",
  loading: false,
  notTiktokLink: false,
  fetchVideo: async (url: string) => {
    try {
      set({ loading: true, notTiktokLink: false, video: {} });

      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}?url=${url}?hd=1`
      );

      // Checks if the response is undefined
      if (typeof result.data.data !== "undefined") {
        set({ video: result.data.data });

        // Save history as indexeddb
        const id = await db.history.add({
          cover: get().video.cover,
          title: get().video.title,
          url: url,
        });
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
