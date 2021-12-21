import { Button } from "@chakra-ui/react";
import Dropzone from "../components/Dropzone";

export default function Home() {
    async function login() {
        await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "philip@angelin.dev",
                password: "123",
            }),
        });
    }

    return (
        <div>
            <Dropzone />
            <Button onClick={login}>Login</Button>
        </div>
    );
}
