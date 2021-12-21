import { StyleConfig } from "@chakra-ui/theme-tools";

export const Button: StyleConfig = {
    baseStyle: {
        fontFamily: "Poppins",
        fontWeight: 600,
        transitionDuration: "0.1s",
        rounded: "md",
        pos: "relative",
        p: "0.5rem",
        border: "2px solid",
        borderColor: "transparent",
        _focus: {
            boxShadow: "none",
            borderColor: "primary.500",
        },
    },
    sizes: {
        md: {
            paddingX: "1rem",
        },
        lg: {
            paddingX: "2rem",
        },
    },
    variants: {
        primary: {
            bgColor: "primary.500",
            border: 0,
            color: "black",
            _focus: {
                boxShadow: "none",
            },
        },
        secondary: {
            border: "2px solid",
            borderColor: "primary.500",
            color: "primary.500",
            textTransform: "uppercase",
            _hover: {
                bgColor: "primary.500",
                color: "black",
            },
            _focus: {
                boxShadow: "none",
            },
        },
        link: {
            color: "inherit",
            _hover: {
                color: "primary.500",
                textDecor: "none",
            },
            _active: {
                color: "primary.500",
            },
            _focus: {
                boxShadow: "none",
            },
        },
        unstyled: {
            border: 0,
        },
    },
};
