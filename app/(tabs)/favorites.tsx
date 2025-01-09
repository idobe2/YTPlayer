import React from "react";
import { View, ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useVideoContext } from "@/contexts/VideoContext";
import VideoCard from "@/components/VideoCard";
import { Text } from "@/components/ui/text";

/**
 * Favorites screen containing a list of favorite videos
 * @returns Favorites screen
 */
export default function FavoritesScreen() {
  const backgroundColor = useThemeColor(
    { light: "#FFF7F1", dark: "#000" },
    "background"
  );
  const { favorites } = useVideoContext();

  return (
    <ScrollView className="flex-1 p-2" style={{ backgroundColor }}>
      {favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center h-full">
          <Text className="text-center text-lg">No favorite videos yet.</Text>
        </View>
      ) : (
        favorites.map((video) => <VideoCard key={video.id} video={video} />)
      )}
    </ScrollView>
  );
}
