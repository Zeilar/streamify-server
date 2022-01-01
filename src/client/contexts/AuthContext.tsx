import { createContext, useState } from "react";
import { useInject } from "../hooks/useInject";

interface IAuthContext {
    user: any;
    login(payload: LoginPayload): Promise<boolean>;
    setUser: React.Dispatch<any>;
    authenticated: boolean;
    logout(): Promise<void>;
}

interface AuthProps {
    children: React.ReactNode;
}

interface LoginPayload {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthContextProvider({ children }: AuthProps) {
    const { apiService } = useInject();
    const [user, setUser] = useState<any>();

    async function login(payload: LoginPayload) {
        const response = await apiService.request<any>("/auth/login", {
            method: "POST",
            data: { ...payload },
        });
        if (response.ok) {
            setUser(response.data);
        }
        return response.ok;
    }

    async function logout() {
        const { ok } = await apiService.request("/auth/logout");
        if (ok) {
            setUser(null);
        }
    }

    const values: IAuthContext = {
        user,
        login,
        setUser,
        authenticated: Boolean(user),
        logout,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
