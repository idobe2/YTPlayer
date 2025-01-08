import { StyleSheet, ScrollView } from "react-native";
import VideoList from "@/components/VideoList";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function HomeScreen() {
  const backgroundColor = useThemeColor(
    { light: "#FFF7F1", dark: "#000" },
    "background"
  );

  return (
    <ScrollView style={[StyleSheet.absoluteFill, { backgroundColor }]}>
      <VideoList />
    </ScrollView>
  );
}
