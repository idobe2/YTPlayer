import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import YouTube from "react-native-youtube-iframe";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useVideoContext } from "@/contexts/VideoContext";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { useThemeColor } from "@/hooks/useThemeColor";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * A video details screen with a YouTube player
 * @returns Video details screen
 */
const VideoDetails = () => {
  const backgroundColor = useThemeColor(
    { light: "#FFE4C9", dark: "#1A262E" },
    "background"
  );

  const { id, thumbnail, title, description } = useLocalSearchParams();
  const { favorites, addFavorite, removeFavorite } = useVideoContext();
  const videoId = Array.isArray(id) ? id[0] : id;
  const isFavorite = favorites.some((video) => video.id === videoId);

  const [playerLoading, setPlayerLoading] = useState(true);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(videoId);
    } else {
      addFavorite({
        id: videoId,
        thumbnail: thumbnail as string,
        title: title as string,
        description: description as string,
      });
    }
  };

  const handleLoading = () => {
    setPlayerLoading(false);
  };

  return (
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      <ThemedView
        style={{ backgroundColor: backgroundColor }}
        className="flex-1 p-4"
      >
        <HStack space="md" reversed={false}>
          <Box className="w-5/6 py-2">
            <Text className="text-2xl font-bold mb-4 dark:text-white">
              {title}
            </Text>
          </Box>
          <Box className="w-1/6 items-center justify-center">
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={32}
              color={isFavorite ? "red" : "gray"}
              onPress={toggleFavorite}
            />
          </Box>
        </HStack>
        {playerLoading && <LoadingSpinner />}
        <YouTube videoId={videoId} height={230} onReady={handleLoading} />
        <Text className="text-base dark:text-white mt-12">
          {description || "No description available."}
        </Text>
      </ThemedView>
    </ScrollView>
  );
};

export default VideoDetails;
