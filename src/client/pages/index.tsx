import { Button, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { Input } from "@chakra-ui/input";
import Dropzone from "../components/Dropzone";
import { useRouter } from "next/router";
import { useInject, useAuth } from "../hooks";
import { useState } from "react";

export default function Home() {
    const router = useRouter();
    const { apiService } = useInject();
    const { login } = useAuth();
    const [uploading, setUploading] = useState(false);

    async function loginSubmit() {
        await login({
            email: "philip@angelin.dev",
            password: "123",
        });
    }

    async function upload(file: File) {
        const formData = new FormData();
        formData.append("video", file);
        setUploading(true);
        const response = await apiService.request<{ id: string }>("/video", {
            method: "POST",
            data: formData,
            onUploadProgress: (e) => console.log(e),
        });
        setUploading(false);
        if (response?.ok) {
            router.push(`/video/${response.data.id}`);
        }
    }

    return (
        <div>
            <Text textAlign="center" textStyle="h1" mb="1rem">
                Upload video
            </Text>
            {true && (
                <Spinner
                    emptyColor="gray.500"
                    color="primary.500"
                    size="xl"
                    speed="0.75s"
                />
            )}
            {!uploading && <Dropzone onSubmit={upload} />}
            <Button onClick={loginSubmit}>Login</Button>
            <Input />
        </div>
    );
}
