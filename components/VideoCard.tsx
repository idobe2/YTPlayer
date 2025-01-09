import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/card";
// import { Grid, GridItem } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * A card component that displays a video thumbnail, title, and description
 * @param video { id: string; thumbnail: string; title: string; description: string }
 * @returns Video card
 */
const VideoCard = ({
  video,
}: {
  video: { id: string; thumbnail: string; title: string; description: string };
}) => {
  const router = useRouter();
  const backgroundColor = useThemeColor(
    { light: "#FFE4C9", dark: "#1A262E" },
    "background"
  );
  const textColor = useThemeColor({ light: "#000", dark: "#fff" }, "text");

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/VideoDetails",
          params: {
            id: video.id,
            thumbnail: video.thumbnail,
            title: video.title,
            description: video.description,
          },
        })
      }
    >
      <Card
        key={video.id}
        className={`rounded-lg border border-gray-400 dark:border-neutral-200 my-2`}
        style={{ elevation: 4, backgroundColor: backgroundColor }}
      >
        <HStack space="md" reversed={false}>
          <Box>
            <Image source={video.thumbnail} size="xl" alt="thumbnail" />
          </Box>

          <Box className="w-3/5">
            <Text className="text-lg font-medium dark:text-gray-200">
              {video.title}
            </Text>
          </Box>

          <Box className="w-1/5 justify-center">
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={textColor}
            ></Ionicons>
          </Box>
        </HStack>
      </Card>
    </TouchableOpacity>
  );
};

export default VideoCard;
