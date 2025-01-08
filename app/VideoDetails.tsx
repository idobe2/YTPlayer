import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import YouTube from "react-native-youtube-iframe";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useVideoContext } from "@/contexts/VideoContext";
import { Grid, GridItem } from "@/components/ui/grid";
import { useThemeColor } from "@/hooks/useThemeColor";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * 
 * @returns A video details screen with a YouTube player
 */
const VideoDetails = () => {
  const { id, thumbnail, title, description } = useLocalSearchParams();
  const { favorites, addFavorite, removeFavorite } = useVideoContext();
  const backgroundColor = useThemeColor(
    { light: "#FFE4C9", dark: "#1A262E" },
    "background"
  );

  const videoId = Array.isArray(id) ? id[0] : id;
  const isFavorite = favorites.some((video) => video.id === videoId);
  const [playerLoading, setPlayerLoading] = useState(true); // Loading state for YouTube player

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
    <ScrollView style={{backgroundColor: backgroundColor}}>
      <ThemedView style={{ backgroundColor: backgroundColor }} className="flex-1 p-4">
        <Grid
          _extra={{
            className: "grid-cols-9",
          }}
        >
          <GridItem
            _extra={{
              className: "col-span-7",
            }}
          >
            <Text className="text-2xl font-bold mb-4 dark:text-white">{title}</Text>
          </GridItem>
          <GridItem
            className="flex items-center my-4"
            _extra={{
              className: "col-span-2",
            }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={32}
              color={isFavorite ? "red" : "gray"}
              onPress={toggleFavorite}
            />
          </GridItem>
        </Grid>
          {playerLoading && <LoadingSpinner />}
          <YouTube
            videoId={videoId}
            height={230}
            onReady={handleLoading}
          />
        <Text className="text-base dark:text-white mt-12">
          {description || "No description available."}
        </Text>
      </ThemedView>
    </ScrollView>
  );
};

export default VideoDetails;
