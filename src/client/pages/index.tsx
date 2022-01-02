import { Flex, Progress, Text } from "@chakra-ui/react";
import Dropzone from "../components/Dropzone";
import { useRouter } from "next/router";
import { useInject } from "../hooks";
import { useState } from "react";

export default function Home() {
    const router = useRouter();
    const { apiService } = useInject();
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    async function upload(file: File) {
        const formData = new FormData();
        formData.append("video", file);
        setUploading(true);
        const { data, ok } = await apiService.request<{ id: string }>(
            "/video",
            {
                method: "POST",
                data: formData,
                onUploadProgress: (e: ProgressEvent) => {
                    setProgress(Math.round((e.loaded * 100) / e.total));
                },
            }
        );
        if (ok) {
            router.push(`/video/${data.id}`);
        } else {
            setUploading(false);
        }
    }

    return (
        <Flex flexDir="column" alignItems="center">
            <Text textAlign="center" as="h2" textStyle="h2" mb="1rem">
                Upload video
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
            {!uploading && <Dropzone onSubmit={upload} />}
        </Flex>
    );
}
