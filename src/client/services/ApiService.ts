import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Ok, Err } from "ts-results";

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
                ...config,
            });
            return new Ok(response);
        } catch (error) {
            const response: AxiosResponse<ErrorResponse> = error.response;
            return new Err(response);
        }
    }
}
