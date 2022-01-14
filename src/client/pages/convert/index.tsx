import { Flex, Progress, Text, useToast } from "@chakra-ui/react";
import ConvertDropzone from "../../components/ConvertDropzone";
import { useState } from "react";
import { saveAs } from "file-saver";
import Head from "next/head";
import { apiService } from "../../services";

export default function Home() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const toast = useToast();

    async function upload(file: File) {
        const formData = new FormData();
        formData.append("video", file);
        setUploading(true);
        const { data, ok } = await apiService.request<string>("/convert", {
            method: "POST",
            data: formData,
            onUploadProgress: (e: ProgressEvent) =>
                setProgress(Math.round((e.loaded * 100) / e.total)),
        });
        setUploading(false);
        if (ok) {
            saveAs(
                `/storage/${data}.mp4`,
                `${file.name.slice(0, file.name.lastIndexOf("."))}.mp4`
            );
        } else {
            toast({
                title: "Failed converting file",
                status: "error",
                isClosable: true,
                position: "top",
            });
        }
    }

    return (
        <Flex flexDir="column" alignItems="center">
            <Head>
                <title>mp4 | Convert</title>
            </Head>
            <Text textAlign="center" as="h3" textStyle="h3" mb="1rem">
                Convert video to mp4
            </Text>
            {uploading && (
                <Flex w="100%" flexDir="column">
                    <Text
                        textAlign="center"
                        as="h6"
                        textStyle="h6"
                        mb="0.25rem"
                    >
                        Your video is being processed
                    </Text>
                    <Progress w="100%" value={progress} hasStripe isAnimated />
                </Flex>
            )}
            {!uploading && <ConvertDropzone onSubmit={upload} />}
        </Flex>
    );
}
