import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.API_BASE_URL;

export class ApiService {
    public async request<T>(url: string, config?: AxiosRequestConfig) {
        try {
            const response: AxiosResponse<T> = await axios({
                url,
                ...config,
            });
            return { ...response, ok: response.status < 400 };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
