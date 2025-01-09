import React, { useState } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import VideoList from "@/components/VideoList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useVideoContext } from "@/contexts/VideoContext";

/**
 * Home screen containing the video list
 * @returns Home screen
 */
export default function HomeScreen() {
  const backgroundColor = useThemeColor(
    { light: "#FFF7F1", dark: "#000" },
    "background"
  );
  const [refreshing, setRefreshing] = useState(false);
  const { fetchVideos } = useVideoContext();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchVideos(process.env.EXPO_PUBLIC_CHANNEL_ID as string, 5);
    } catch (error) {
      console.error("Error refreshing videos:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={[StyleSheet.absoluteFill, { backgroundColor }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[backgroundColor]}
        />
      }
    >
      <VideoList />
    </ScrollView>
  );
}
