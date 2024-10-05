import { AssesmentRequest, AssessmentResponse } from "@/interface";
import axiosInstance from "./axios";
import { AxiosResponse } from "axios";

const submitAssessment = async (data: AssesmentRequest): Promise<AssessmentResponse> => {
    try {
        const response: AxiosResponse<AssessmentResponse> = await axiosInstance.post('/api/assessment', data);
        return response.data;
    } catch (error) {
        console.error('Error submitting  assessment:', error);
        throw new Error('Failed to submit  assessment');
    }
};

export default submitAssessment;
