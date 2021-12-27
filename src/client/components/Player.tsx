import React from "react";

interface Props {
    src?: string | null;
}

export default function Player({ src }: Props) {
    return <video controls width="100%" src={src} />;
}
