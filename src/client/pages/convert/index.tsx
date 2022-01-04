import { Flex, Progress, Text } from "@chakra-ui/react";
import ConvertDropzone from "../../components/ConvertDropzone";
import { useInject } from "../../hooks";
import { useState } from "react";
import { saveAs } from "file-saver";

export default function Home() {
    const { apiService } = useInject();
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    async function upload(file: File) {
        const formData = new FormData();
        formData.append("video", file);
        setUploading(true);
        const { data, ok } = await apiService.request<any>("/convert", {
            method: "POST",
            data: formData,
            onUploadProgress: (e: ProgressEvent) =>
                setProgress(Math.round((e.loaded * 100) / e.total)),
        });
        setUploading(false);
        console.log(data);
        if (ok) {
            // const downloadUrl = URL.createObjectURL(new Blob([data]));
            saveAs(new Blob([data.data]), `${file.name}.mp4`);
        }
    }

    return (
        <Flex flexDir="column" alignItems="center">
            <Text textAlign="center" as="h2" textStyle="h2" mb="1rem">
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
