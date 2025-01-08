import React from "react";
import { ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useVideoContext } from "@/contexts/VideoContext";
import VideoCard from "@/components/VideoCard";

export default function FavoritesScreen() {
  const backgroundColor = useThemeColor(
    { light: "#FFF7F1", dark: "#000" },
    "background"
  );
  const { favorites } = useVideoContext();

  return (
    <ScrollView style={{ flex: 1, backgroundColor }}>
      {favorites.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </ScrollView>
  );
}
