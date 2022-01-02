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
                _focus: {
                    borderColor: "primary.500",
                    boxShadow:
                        "0 0 0 1px solid var(--chakra-colors-primary-500)",
                },
            },
        },
    },
};
