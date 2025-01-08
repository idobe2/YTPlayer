import React, { createContext, useContext, useState } from "react";
import { fetchVideosFromChannel, fetchVideosFromQuery } from "@/api/YoutubeApi";

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

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Video[]>([]);

  const addFavorite = (video: Video) => {
    setFavorites((prev) => [...prev, video]);
  };

  const removeFavorite = (videoId: string) => {
    setFavorites((prev) => prev.filter((video) => video.id !== videoId));
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
