import { Box, Flex, Text } from "@chakra-ui/layout";
import { CSSProperties, useEffect, useState } from "react";
import { useDropzone, FileError } from "react-dropzone";
import { fileConfig } from "../config/file";
import prettyBytes from "pretty-bytes";
import Player from "../components/Player";
import { Button } from "@chakra-ui/button";

enum ErrorDict {
    "file-too-large" = "The video is too large.",
    "file-invalid-type" = "Invalid file type.",
}

interface Props {
    onSubmit(file: File): void;
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

export default function Dropzone({ onSubmit }: Props) {
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
        accept: ".mp4",
        maxFiles: 1,
        maxSize: fileConfig.maxSize,
        onDropRejected: (rejections) => setErrors(rejections[0].errors), // If maxFiles is greater than 1, this must be fixed
        onDropAccepted: () => setErrors([]),
        onDrop: () => setPreview(null),
    });

    const selectedVideo = acceptedFiles[0];

    useEffect(() => {
        if (selectedVideo) {
            setPreview(URL.createObjectURL(selectedVideo));
        }
    }, [selectedVideo]);

    const style = {
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
    };

    return (
        <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            w="100%"
        >
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
                    <Player src={preview} />
                    <Text as="h2" textStyle="h2">
                        Looking good?
                    </Text>
                    <Button onClick={() => onSubmit(selectedVideo)}>
                        Upload
                    </Button>
                </Flex>
            )}
        </Flex>
    );
}
