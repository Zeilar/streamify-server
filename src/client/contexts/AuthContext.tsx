import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { User } from "../@types/user";
import { apiService } from "../services";

interface IAuthContext {
    user: User | null;
    setUser: React.Dispatch<User>;
    login(payload: LoginOrRegisterPayload): Promise<void>;
    register(payload: LoginOrRegisterPayload): Promise<void>;
    logout(): Promise<void>;
    authenticated: boolean;
}

interface AuthProps {
    children: React.ReactNode;
}

interface LoginOrRegisterPayload {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthContextProvider({ children }: AuthProps) {
    const toast = useToast();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        whoami();
    }, []);

    async function whoami() {
        const response = await apiService.request<User>("/auth/whoami");
        if (response.ok) {
            setUser(response.data);
        }
    }

    async function login(payload: LoginOrRegisterPayload) {
        const response = await apiService.request<User>("/auth/login", {
            method: "POST",
            data: { ...payload },
        });
        if (response.ok) {
            toast({
                title: "Logged in",
                status: "success",
                isClosable: true,
                position: "top",
            });
            setUser(response.data);
        }
    }

    async function register(payload: LoginOrRegisterPayload) {
        const response = await apiService.request<User>("/auth/register", {
            data: payload,
            method: "POST",
        });
        if (response.ok) {
            toast({
                title: "Created your account!",
                status: "success",
                isClosable: true,
                position: "top",
            });
            setUser(response.data);
        }
    }

    async function logout() {
        const response = await apiService.request("/auth/logout");
        if (response.ok) {
            toast({
                title: "Logged out",
                status: "success",
                isClosable: true,
                position: "top",
            });
            setUser(null);
        }
    }

    const values: IAuthContext = {
        user,
        login,
        setUser,
        authenticated: Boolean(user),
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
