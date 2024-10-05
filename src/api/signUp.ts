import { SignUpRequest, SignUpResponse } from "@/interface";
import axiosInstance from "./axios";

const signUpRequest = async (data: SignUpRequest): Promise<string> => {
    try {
        const response = await axiosInstance.post<SignUpResponse>('/api/signup', data);
        return response.data.token; 
    } catch (error) {
        console.error('Sign-up failed:', error);
        throw new Error('Unable to sign up');
    }
};

export default signUpRequest;