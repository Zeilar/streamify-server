import { Box, Flex, Text } from "@chakra-ui/layout";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { useDropzone, FileError } from "react-dropzone";
import { fileConfig } from "../config/file";
import prettyBytes from "pretty-bytes";
import Player from "react-player";
import { Button } from "@chakra-ui/button";

enum ErrorDict {
    "file-too-large" = "The video is too large.",
    "file-invalid-type" = "Invalid file type.",
}

const baseStyle: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    borderWidth: 2,
    borderRadius: "var(--chakra-radii-sm)",
    borderStyle: "dashed",
    borderColor: "var(--chakra-colors-gray-700)",
    backgroundColor: "var(--chakra-colors-gray-800)",
    color: "var(--chakra-colors-text-default)",
    outline: "none",
    transition: "border 0.25s ease-in-out",
    cursor: "pointer",
};

const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "var(--chakra-colors-primary-500)",
};

const rejectStyle = {
    borderColor: "var(--chakra-colors-danger)",
};

export default function Dropzone() {
    const [preview, setPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<FileError[]>([]);
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: fileConfig.accept,
        maxFiles: 1,
        maxSize: fileConfig.maxSize,
        onDropRejected: (rejections) => setErrors(rejections[0].errors), // If maxFiles is greater than 1, this must be fixed
        onDropAccepted: () => setErrors([]),
        onDrop: () => setPreview(null),
    });

    const selectedVideo = useMemo(() => acceptedFiles[0], [acceptedFiles]);

    useEffect(() => {
        if (selectedVideo) {
            setPreview(URL.createObjectURL(selectedVideo));
        }
    }, [selectedVideo]);

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    async function upload() {
        const formData = new FormData();
        formData.append("video", selectedVideo);
        await fetch("/api/v1/video", {
            method: "POST",
            body: formData,
        });
    }

    return (
        <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Text textAlign="center" textStyle="h1" mb="1rem">
                Upload video
            </Text>
            <Box {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <Text>Drop your video here or click to select it</Text>
            </Box>
            <Text
                textAlign="center"
                fontStyle="italic"
                color="text.muted"
                mt="0.5rem"
            >
                Only MP4 format supported. Maximum file size
                {` ${prettyBytes(fileConfig.maxSize)}.`}
            </Text>
            <Box>
                {errors.map((error, i) => (
                    <Box key={i}>{ErrorDict[error.code]}</Box>
                ))}
            </Box>
            {preview && (
                <Flex flexDir="column" alignItems="center">
                    <Player width="100%" url={preview} controls />
                    <Text textStyle="h2">Looking good?</Text>
                    <Button onClick={upload}>Upload</Button>
                </Flex>
            )}
        </Flex>
    );
}
