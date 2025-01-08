import React from "react";
import { Text } from "react-native";
import YouTube from "react-native-youtube-iframe";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Ionicons } from "@expo/vector-icons";
import { useVideoContext } from "@/contexts/VideoContext";
import { Grid, GridItem } from "@/components/ui/grid";

const VideoDetails = () => {
  const { id, thumbnail, title, description } = useLocalSearchParams();
  const { favorites, addFavorite, removeFavorite } = useVideoContext();

  const videoId = Array.isArray(id) ? id[0] : id;
  const isFavorite = favorites.some((video) => video.id === videoId);

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

  return (
    <ThemedView className="flex-1 p-4">
      <Grid
        _extra={{
          className: "grid-cols-9",
        }}
      >
        <GridItem
          _extra={{
            className: "col-span-8",
          }}
        >
          <Text className="text-2xl font-bold mb-4 dark:text-white">
            {title}
          </Text>
        </GridItem>
        <GridItem
          className="flex items-center my-4"
          _extra={{
            className: "col-span-1",
          }}
        >
          <Ionicons
            name="heart"
            size={32}
            color={isFavorite ? "red" : "gray"}
            onPress={toggleFavorite}
          />
        </GridItem>
      </Grid>
      <Box className="mb-4">
        <YouTube videoId={videoId} height={230} />
      </Box>
      <Text className="text-base dark:text-white">
        {description || "No description available."}
      </Text>
    </ThemedView>
  );
};

export default VideoDetails;
