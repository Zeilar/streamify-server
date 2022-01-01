import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Response<T> = AxiosResponse<T> & { ok: boolean };

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
            return { ...response, ok: response.status < 400 };
        } catch (error) {
            return { ...error.response, ok: error.response.status < 400 };
        }
    }
}
