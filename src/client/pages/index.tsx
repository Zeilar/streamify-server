import { Button } from "@chakra-ui/react";
import Dropzone from "../components/Dropzone";
import { useRouter } from "next/router";
import { useInject, useAuth } from "../hooks";

export default function Home() {
    const router = useRouter();
    const { apiService } = useInject();
    const { login } = useAuth();

    async function loginSubmit() {
        await login({
            email: "philip@angelin.dev",
            password: "123",
        });
    }

    async function upload(file: File) {
        const formData = new FormData();
        formData.append("video", file);
        const response = await apiService.request<{ id: string }>(
            "/api/v1/video",
            {
                method: "POST",
                data: formData,
            }
        );
        if (response.ok) {
            router.push(`/video/${response.data.id}`);
        }
    }

    return (
        <div>
            <Dropzone onSubmit={upload} />
            <Button onClick={loginSubmit}>Login</Button>
        </div>
    );
}
