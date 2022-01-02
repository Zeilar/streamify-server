import { StyleConfig } from "@chakra-ui/theme-tools";

export const Button: StyleConfig = {
    baseStyle: {
        transitionDuration: "0.1s",
        rounded: "md",
        pos: "relative",
        p: "0.5rem",
        border: 0,
        _focus: {
            boxShadow: "none",
        },
    },
    sizes: {
        md: {
            paddingX: "1.5rem",
        },
    },
    variants: {
        primary: {
            bgColor: "primary.500",
            color: "black",
            _hover: {
                bgColor: "primary.400",
            },
        },
        secondary: {
            bgColor: "whiteAlpha.50",
            _hover: {
                bgColor: "whiteAlpha.200",
            },
        },
        unstyled: {
            border: 0,
        },
        icon: {
            border: 0,
            padding: "0.75rem",
            paddingInline: "0.75rem",
        },
    },
};
