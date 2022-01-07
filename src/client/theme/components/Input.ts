import { StyleConfig } from "@chakra-ui/theme-tools";

export const Input: StyleConfig = {
    variants: {
        flushed: {
            field: {
                borderBottom: "2px solid",
                _focus: {
                    borderColor: "primary.500",
                    boxShadow: "none",
                },
                _invalid: {
                    borderColor: "danger",
                    boxShadow: "none",
                },
            },
        },
    },
};
