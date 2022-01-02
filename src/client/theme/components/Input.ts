import { StyleConfig } from "@chakra-ui/theme-tools";

export const Input: StyleConfig = {
    baseStyle: {
        field: {
            boxShadow: "elevate.all",
        },
    },
    variants: {
        flushed: {
            field: {
                borderBottom: "2px solid",
                _focus: {
                    borderColor: "primary.500",
                    boxShadow: "none",
                },
            },
        },
    },
};
