import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
    src?: string;
}

export default function Player({ src }: Props) {
    return (
        <Box
            as="video"
            controls
            width="100%"
            src={src}
            sx={{ aspectRatio: "16 / 9" }}
        />
    );
}
