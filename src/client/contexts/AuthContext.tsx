import { createContext, useState } from "react";
import { useInject } from "../hooks/useInject";

interface IAuthContext {
    user: any;
    login(payload: LoginPayload): Promise<boolean>;
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
    const [user, setUser] = useState();

    async function login(payload: LoginPayload) {
        const response = await apiService.request<any>("/auth/login", {
            method: "POST",
            data: { ...payload },
        });
        if (response?.ok) {
            setUser(response.data);
        }
        return response.ok;
    }

    const values: IAuthContext = {
        user,
        login,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
