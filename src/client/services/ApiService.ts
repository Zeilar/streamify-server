import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Response<T> = AxiosResponse<T> & {
    ok: boolean;
    clientError: boolean;
    serverError: boolean;
};

export class ApiService {
    public async request<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<Response<T>> {
        try {
            const response: AxiosResponse<T> = await axios({
                url,
                ...config,
            });
            return {
                ...response,
                ok: response.status < 400,
                clientError: response.status >= 400 && response.status < 500,
                serverError: response.status >= 500,
            };
        } catch (error) {
            const response: AxiosResponse = error.response;
            return {
                ...response,
                ok: response.status < 400,
                clientError: response.status >= 400 && response.status < 500,
                serverError: response.status >= 500,
            };
        }
    }
}
