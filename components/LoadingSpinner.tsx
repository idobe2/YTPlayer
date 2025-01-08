import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

/**
 * A loading spinner component
 * @returns A spinner with a loading text
 */
const LoadingSpinner = () => {
  return (
    <HStack space="sm">
      <Spinner />
      <Text size="md">Please Wait</Text>
    </HStack>
  );
};

export default LoadingSpinner;
