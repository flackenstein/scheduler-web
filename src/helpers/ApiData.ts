import Axios from "axios";
import { userActions } from "../store/actions/user.actions";

interface Config {
    timeout: number;
    validateStatus: any;
    headers?: {
        Authorization: string;
    };
    params?: any;
}

export interface ApiResponse {
    success: boolean;
    data: any;
    errors?: any;
}

const getAxiosConfig = (): Config => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const config: Config = {
        timeout: 60 * 1000,
        validateStatus: (status: number) => {
            // Auto logout if 401 response returned from api
            if (status === 401) {
                userActions.logout();
                window.location.reload(true);
            }
            return true;
        }
    };

    if (user.token) {
        config.headers = {
            Authorization: "Bearer " + user.token
        };
    }

    return config;
};

const errorHandler = (response?: any): ApiResponse => {
    return {
        success: false,
        data: {}
    };
};

export const Get = async (url: string, params?: {}): Promise<ApiResponse> => {
    try {
        const config: Config = getAxiosConfig();
        if (params) config.params = params;

        const response = await Axios.get(url, config);

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.info(`Error connecting to API GET endpoint "${url}"`);
    }

    return errorHandler();
};

export const Post = async (url: string, data: any): Promise<ApiResponse> => {
    try {
        const config = getAxiosConfig();

        if (!data) data = {};

        const response = await Axios.post(url, data, config);

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.info(`Error connecting to API POST endpoint "${url}"`);
    }

    return errorHandler();
};
