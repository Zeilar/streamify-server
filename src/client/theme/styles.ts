export const styles = {
    global: {
        "::selection": {
            color: "primary.200",
        },
        "*, *::before, *::after": {
            borderColor: "border.default",
        },
        body: {
            display: "flex",
            minHeight: "100vh !important", // Due to Chakra default styling
            backgroundColor: "body",
            overflowX: "hidden",
            color: "text.default",
            justifyContent: "center",
            // "::-webkit-scrollbar-thumb": {
            //     backgroundColor: "brand.default",
            //     backgroundClip: "padding-box",
            //     border: "4px solid transparent",
            //     borderRadius: 100,
            // },
        },
        "#root": {
            height: "100%",
            display: "flex",
        },
        "img, svg, ::placeholder": {
            userSelect: "none",
        },
        "::-webkit-scrollbar": {
            width: "1.2rem",
        },
        "::-webkit-scrollbar-thumb": {
            backgroundClip: "padding-box",
            border: "4px solid transparent",
            backgroundColor: "brand.default",
            borderRadius: 100,
        },
        "::-webkit-scrollbar-track": {
            backgroundColor: "gray.900",
        },
        ".chakra-toast__inner .chakra-alert": {
            bgColor: "primary.500",
        },
    },
};
