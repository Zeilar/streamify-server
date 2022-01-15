import { Flex, Progress, Text, useToast } from "@chakra-ui/react";
import UploadDropzone from "../components/UploadDropzone";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import { apiService } from "../services";

export default function Home() {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const toast = useToast();

    async function upload(file: File, title: string) {
        const formData = new FormData();
        formData.append("video", file);
        formData.append("title", title);
        formData.append("visibility", "public");
        setUploading(true);
        const response = await apiService.request<{ id: string }>("videos", {
            method: "POST",
            data: formData,
            onUploadProgress: (e: ProgressEvent) =>
                setProgress(Math.round((e.loaded * 100) / e.total)),
        });
        setUploading(false);
        if (response.ok) {
            router.push(`/video/${response.data.id}`);
        } else {
            toast({
                title: "Failed uploading file",
                status: "error",
                isClosable: true,
                position: "top",
            });
        }
    }

    return (
        <Flex flexDir="column" alignItems="center">
            <Head>
                <title>mp4</title>
            </Head>
            <Text textAlign="center" as="h3" textStyle="h3" mb="1rem">
                Upload mp4 video
            </Text>
            {uploading && (
                <Flex w="100%" flexDir="column">
                    <Text
                        textAlign="center"
                        as="h6"
                        textStyle="h6"
                        mb="0.25rem"
                    >
                        Your video is being uploaded
                    </Text>
                    <Progress w="100%" value={progress} hasStripe isAnimated />
                </Flex>
            )}
            {!uploading && <UploadDropzone onSubmit={upload} />}
        </Flex>
    );
}
