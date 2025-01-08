import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/card";
import { Grid, GridItem } from "@/components/ui/grid";
import { Image } from "@/components/ui/image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 *
 * @param video { id: string; thumbnail: string; title: string; description: string }
 * @returns A card component that displays a video thumbnail, title, and description
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
        <Grid
          className="flex flex-row"
          _extra={{
            className: "grid-cols-9",
          }}
        >
          <GridItem
            className="rounded-md"
            _extra={{
              className: "col-span-3",
            }}
          >
            <Image source={video.thumbnail} size="xl" alt="thumbnail" />
          </GridItem>

          <GridItem
            className="rounded-md"
            _extra={{
              className: "col-span-5",
            }}
          >
            <Text className="text-lg font-medium dark:text-gray-200">
              {video.title}
            </Text>
          </GridItem>

          <GridItem
            className="rounded-md items-center justify-center"
            _extra={{
              className: "col-span-1",
            }}
          >
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={textColor}
            ></Ionicons>
          </GridItem>
        </Grid>
      </Card>
    </TouchableOpacity>
  );
};

export default VideoCard;
