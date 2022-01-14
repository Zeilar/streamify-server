import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ErrorResponse {
    error: string;
    message: string;
    statusCode: number;
}

export class ApiService {
    public async request<T>(url: string, config?: AxiosRequestConfig) {
        try {
            const response: AxiosResponse<T> = await axios({
                url,
                withCredentials: true,
                ...config,
            });
            return { ...response, ok: true } as const;
        } catch (error) {
            const response: AxiosResponse<ErrorResponse> = error.response;
            return { ...response, ok: false } as const;
        }
    }
}
