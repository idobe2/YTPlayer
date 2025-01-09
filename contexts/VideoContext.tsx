import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchVideosFromChannel, fetchVideosFromQuery } from "@/api/YoutubeApi";
import Toast from "react-native-toast-message";

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
}

interface VideoContextType {
  favorites: Video[];
  addFavorite: (video: Video) => void;
  removeFavorite: (videoId: string) => void;
  fetchVideos: (channelId: string, maxResults?: number) => Promise<any[]>;
}

const FAVORITES_STORAGE_KEY = "favorites";

const VideoContext = createContext<VideoContextType | undefined>(undefined);

/**
 * A provider component that wraps the app and provides video-related functionality
 * @param children React children elements
 * @returns Video provider component
 */
export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Video[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(
          FAVORITES_STORAGE_KEY
        );
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites from AsyncStorage:", error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favorites)
        );
      } catch (error) {
        console.error("Error saving favorites to AsyncStorage:", error);
      }
    };

    saveFavorites();
  }, [favorites]);

  const addFavorite = (video: Video) => {
    setFavorites((prev) => [...prev, video]);
    Toast.show({
      type: "success",
      text1: "Video added to favorites",
      visibilityTime: 4000,
    });
  };

  const removeFavorite = (videoId: string) => {
    setFavorites((prev) => prev.filter((video) => video.id !== videoId));
    Toast.show({
      type: "success",
      text1: "Video removed from favorites",
      visibilityTime: 4000,
    });
  };

  const fetchVideos = async (query: string, maxResults: number = 5) => {
    if (maxResults < 10) return await fetchVideosFromChannel(query, maxResults);
    return await fetchVideosFromQuery(query, maxResults);
  };

  return (
    <VideoContext.Provider
      value={{ favorites, addFavorite, removeFavorite, fetchVideos }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
