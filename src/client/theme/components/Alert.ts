import { StyleConfig } from "@chakra-ui/theme-tools";
import { AlertProps } from "@chakra-ui/react";

export const Alert: StyleConfig = {
    variants: {
        // @ts-ignore
        solid: (props: AlertProps) => {
            switch (props.status) {
                case "error":
                    return {
                        container: {
                            bgColor: "danger",
                        },
                    };
                case "success":
                    return {
                        container: {
                            bgColor: "primary.500",
                        },
                    };
            }
        },
    },
};
