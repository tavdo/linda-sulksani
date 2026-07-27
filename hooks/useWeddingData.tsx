"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { WeddingData } from "@/types";
import { WEDDING_DATA } from "@/constants/wedding-data";

interface WeddingDataContextType {
  data: WeddingData;
  loading: boolean;
  refresh: () => Promise<void>;
}

const defaultImages = {
  hero: "/uploads/couple-3.jpg",
  finale: "/uploads/couple-4.jpg",
  preloader: "/uploads/couple-4.jpg",
};

const fallbackData: WeddingData = {
  ...WEDDING_DATA,
  images: defaultImages,
};

const WeddingDataContext = createContext<WeddingDataContextType>({
  data: fallbackData,
  loading: true,
  refresh: async () => {},
});

export function WeddingDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WeddingData>(fallbackData);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch("/api/wedding");
      if (res.ok) {
        const json = (await res.json()) as WeddingData;
        setData({ ...json, images: json.images || defaultImages });
      }
    } catch {
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <WeddingDataContext.Provider value={{ data, loading, refresh }}>
      {children}
    </WeddingDataContext.Provider>
  );
}

export function useWeddingData() {
  return useContext(WeddingDataContext);
}
