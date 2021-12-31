import { StyleConfig } from "@chakra-ui/theme-tools";

export const Progress: StyleConfig = {
    baseStyle: {
        filledTrack: {
            bgColor: "primary.500",
            transition: "width 1s ease-in-out",
        },
        track: {
            bgColor: "gray.700",
        },
    },
};
