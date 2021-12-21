export const styles = {
    global: {
        "::selection": {
            color: "primary.500",
        },
        "*, *::before, *::after": {
            borderColor: "border.default",
        },
        body: {
            minHeight: "100vh",
            backgroundColor: "body",
            overflowX: "hidden",
            color: "text.default",
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
    },
};
