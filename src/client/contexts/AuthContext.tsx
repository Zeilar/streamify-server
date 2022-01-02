import { useToast } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { User } from "../@types/user";
import { useInject } from "../hooks/useInject";

interface IAuthContext {
    user: User;
    setUser: React.Dispatch<User>;
    login(payload: LoginOrRegisterPayload): Promise<void>;
    logout(): Promise<void>;
    register(payload: LoginOrRegisterPayload): Promise<void>;
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
    const { apiService } = useInject();
    const [user, setUser] = useState<User>();

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
        const { ok, data } = await apiService.request<User>("/auth/register", {
            data: payload,
            method: "POST",
        });
        if (ok) {
            toast({
                title: "Created your account!",
                status: "success",
                isClosable: true,
                position: "top",
            });
            setUser(data);
        }
    }

    async function logout() {
        const { ok } = await apiService.request("/auth/logout");
        if (ok) {
            toast({
                title: "You have been logged out",
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
