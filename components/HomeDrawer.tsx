import React from "react";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "./ui/hstack";
import { ExternalLink } from "./ExternalLink";
import { Text } from "@/components/ui/text";

interface HomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  colorMode: "light" | "dark";
  setColorMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

/**
 * Home drawer component with menu items
 * @param isOpen {boolean} Drawer open state
 * @param onClose {() => void} Drawer close handler
 * @param colorMode {string} Current color mode
 * @param setColorMode {React.Dispatch<React.SetStateAction<string>>} Color mode setter
 * @returns Home drawer
 */
const HomeDrawer: React.FC<HomeDrawerProps> = ({
  isOpen,
  onClose,
  colorMode,
  setColorMode,
}) => {
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md" anchor="left">
      <DrawerBackdrop />
      <DrawerContent>
        {/* Header */}
        <DrawerHeader>
          <Box
            onTouchStart={toggleColorMode}
            className="flex flex-row items-center"
          >
            <Heading size="3xl" className="py-12 mr-12">
              Menu
            </Heading>
            {colorMode === "light" ? (
              <>
                <Ionicons name="sunny-outline" size={28} color="black" />
              </>
            ) : (
              <>
                <Ionicons name="moon-outline" size={28} color="white" />
              </>
            )}
          </Box>
        </DrawerHeader>

        {/* Body */}
        <DrawerBody>
          {/*Coming soon*/}
          {/* <Grid
            className="w-full flex flex-row items-center justify-center pl-6"
            _extra={{
              className: "grid-cols-6",
            }}
          >
            <GridItem _extra={{ className: "col-span-6" }}></GridItem>
            <GridItem _extra={{ className: "col-span-3" }}></GridItem>
            <GridItem _extra={{ className: "col-span-3" }}></GridItem>
          </Grid> */}
        </DrawerBody>

        {/* Footer */}
        <DrawerFooter>
          <Box className="justify-center h-40 w-full">
            <VStack space="md" reversed={false}>
              <Text className="text-center">About me</Text>
              <HStack space="md" reversed={false} className="justify-center">
                <Box>
                  <ExternalLink href="https://www.linkedin.com/in/idobn/">
                    <Ionicons
                      name="logo-linkedin"
                      size={32}
                      color={colorMode === "light" ? "black" : "white"}
                    ></Ionicons>
                  </ExternalLink>
                </Box>
                <Box>
                  <ExternalLink href="https://github.com/idobe2">
                    <Ionicons
                      name="logo-github"
                      size={32}
                      color={colorMode === "light" ? "black" : "white"}
                    ></Ionicons>
                  </ExternalLink>
                </Box>
              </HStack>
            </VStack>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default HomeDrawer;
