import { Stack } from "expo-router";
import "@/global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import HomeDrawer from "@/components/HomeDrawer";
import { Ionicons } from "@expo/vector-icons";
import { VideoProvider } from "@/contexts/VideoContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import Toast from "react-native-toast-message";
import toastConfig from "@/config/ToastConfig";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [showDrawer, setShowDrawer] = useState(false);
  const backgroundColor = useThemeColor(
    { light: "#E78895", dark: "#80DEEA" },
    "background"
  );

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode={colorMode}>
      <VideoProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              title: "YTPlayer",
              headerStyle: {
                backgroundColor: backgroundColor,
              },
              headerTitleStyle: {
                fontFamily: "SpaceMono",
              },
              headerTintColor: colorMode === "light" ? "#000" : "#fff",
              headerLeft: () => (
                <Box onTouchStart={() => setShowDrawer(true)}>
                  <Ionicons
                    name="menu"
                    size={32}
                    color={colorMode === "light" ? "#000" : "#fff"}
                  />
                </Box>
              ),
            }}
          />
          <Stack.Screen
            name="VideoDetails"
            options={{
              title: "",
              headerStyle: {
                backgroundColor,
              },
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </VideoProvider>
      <StatusBar style="auto" />
      <HomeDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        colorMode={colorMode}
        setColorMode={setColorMode}
      />
      <Toast config={toastConfig}/>
    </GluestackUIProvider>
  );
}
