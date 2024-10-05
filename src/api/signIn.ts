import { SignInRequest, SignInResponse } from "@/interface";
import axiosInstance from "./axios";

const signInRequest = async (data: SignInRequest): Promise<{ username: string; token: string; id: string }> => {
    try {
        const response = await axiosInstance.post<SignInResponse>('/api/signin', data);
        return {
            username: response.data.username,
            token: response.data.token,
            id: response.data.id
        };
    } catch (error) {
        console.error('Sign-in failed:', error);
        throw new Error('Unable to sign in');
    }
};

export default signInRequest;
