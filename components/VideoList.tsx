import React, { useState, useEffect } from "react";
import { View } from "react-native";
import VideoCard from "./VideoCard";
import LoadingSpinner from "./LoadingSpinner";
import { useVideoContext } from "@/contexts/VideoContext";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Box } from "@/components/ui/box";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

const CHANNEL_ID = "UCW5YeuERMmlnqo4oq8vwUpg";

const VideoList = () => {
  const backgroundColor = useThemeColor(
    { light: "#0a7ea4", dark: "#80DEEA" },
    "background"
  );
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const { fetchVideos } = useVideoContext();

  const loadVideos = async (searchQuery: string = "") => {
    try {
      const fetchedVideos = searchQuery
        ? await fetchVideos(searchQuery, 10)
        : await fetchVideos(CHANNEL_ID, 5);
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error loading videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    loadVideos(query);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View className="w-full space-y-4 px-2 py-6">
      <View className="flex-row items-center space-x-2">
        <Input variant="outline" size="lg" className="flex-1 mr-4">
          <InputSlot className="pl-2"></InputSlot>
          <InputField
            placeholder="Search..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            className="p-2"
          />
        </Input>
        <Box onTouchStart={handleSearch} className="mr-2">
          <Ionicons name="search" size={24} color={backgroundColor} />
        </Box>
      </View>
      <View className="py-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </View>
    </View>
  );
};

export default VideoList;
