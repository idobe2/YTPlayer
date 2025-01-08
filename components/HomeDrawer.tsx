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
import { Grid, GridItem } from "@/components/ui/grid";
import { ExternalLink } from "./ExternalLink";
import { Text } from "@/components/ui/text";

interface HomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  colorMode: "light" | "dark";
  setColorMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

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
          <Heading size="3xl" className="py-4 mb-4">
            Menu
          </Heading>
        </DrawerHeader>

        {/* Body */}
        <DrawerBody>
          <Box
            onTouchStart={toggleColorMode}
            className="flex flex-row items-center mb-4"
          >
            {colorMode === "light" ? (
              <>
                <Ionicons name="sunny-outline" size={24} color="black" />
              </>
            ) : (
              <>
                <Ionicons name="moon-outline" size={24} color="white" />
              </>
            )}
          </Box>
        </DrawerBody>

        {/* Footer */}
        <DrawerFooter>
          <Grid
            className="w-full flex flex-row items-center justify-center pl-6"
            _extra={{
              className: "grid-cols-6",
            }}
          >
            <GridItem
              className="py-4 pr-10"
              _extra={{ className: "col-span-6" }}
            >
              <Text className="text-center">About me</Text>
            </GridItem>
            <GridItem _extra={{ className: "col-span-3" }}>
              <ExternalLink href="https://www.linkedin.com/in/idobn/">
                <Ionicons
                  name="logo-linkedin"
                  size={32}
                  color={colorMode === "light" ? "black" : "white"}
                ></Ionicons>
              </ExternalLink>
            </GridItem>
            <GridItem _extra={{ className: "col-span-3" }}>
              <ExternalLink href="https://github.com/idobe2">
                <Ionicons
                  name="logo-github"
                  size={32}
                  color={colorMode === "light" ? "black" : "white"}
                ></Ionicons>
              </ExternalLink>
            </GridItem>
          </Grid>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default HomeDrawer;
