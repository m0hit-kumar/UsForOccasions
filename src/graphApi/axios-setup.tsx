import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

export const makeRequest = async (options: AxiosRequestConfig) => {
    try {
        let response = await axios.request(options);
         
        if (response.status !== 200) {
            throw new Error('Empty response or non-OK status');
        }
        return response.data;
    } catch (error) {
        toast.error(`An error occurred: ${error}`);
        throw error;
    }
};