import { createContext, useRef } from "react";
import { ApiService } from "../services/ApiService";

export interface IDependencyContext {
    apiService: ApiService;
}

interface DependencyProps {
    children: React.ReactNode;
}

export const DependencyContext = createContext({} as IDependencyContext);

export function DependencyContextProvider({ children }: DependencyProps) {
    const apiService = useRef<ApiService>(new ApiService());
    const values: IDependencyContext = { apiService: apiService.current };

    return (
        <DependencyContext.Provider value={values}>
            {children}
        </DependencyContext.Provider>
    );
}
