import { Box, Flex, Text } from "@chakra-ui/layout";
import { CSSProperties, useState } from "react";
import { useDropzone, FileError } from "react-dropzone";
import { fileConfig } from "../config/file";
import prettyBytes from "pretty-bytes";
import { Button } from "@chakra-ui/button";
import Icon from "./Icon";

enum ErrorDict {
    "file-too-large" = "The video is too large.",
    "file-invalid-type" = "Invalid file type.",
}

interface Props {
    onSubmit(file: File): Promise<void>;
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

export default function ConvertDropzone({ onSubmit }: Props) {
    const [errors, setErrors] = useState<FileError[]>([]);
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: "video/*",
        maxFiles: 1,
        maxSize: fileConfig.maxSize,
        onDropRejected: (rejections) => setErrors(rejections[0].errors), // If maxFiles is greater than 1, this must be fixed
        onDropAccepted: () => setErrors([]),
    });

    const selectedVideo = acceptedFiles[0];

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
                <Text>
                    {selectedVideo
                        ? selectedVideo.name
                        : "Drop your video here or click to select it"}
                </Text>
            </Box>
            <Text
                textAlign="center"
                fontStyle="italic"
                color="text.muted"
                mt="0.5rem"
            >
                Only video formats supported. Maximum file size
                {` ${prettyBytes(fileConfig.maxSize)}.`}
            </Text>
            <Box>
                {errors.map((error, i) => (
                    <Box key={i}>{ErrorDict[error.code]}</Box>
                ))}
            </Box>
            {selectedVideo && (
                <Button onClick={() => onSubmit(selectedVideo)} mt="1rem">
                    Convert
                    <Icon
                        icon="mdiAutorenew"
                        ml="0.5rem"
                        w="1.25rem"
                        h="1.25rem"
                    />
                </Button>
            )}
        </Flex>
    );
}
