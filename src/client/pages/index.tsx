import { Button } from "@chakra-ui/react";
import Dropzone from "../components/Dropzone";
import axios from "axios";

export default function Home() {
    async function login() {
        await axios.post(
            "/api/v1/auth/login",
            {
                email: "philip@angelin.dev",
                password: "123",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    return (
        <div>
            <Dropzone />
            <Button onClick={login}>Login</Button>
        </div>
    );
}
