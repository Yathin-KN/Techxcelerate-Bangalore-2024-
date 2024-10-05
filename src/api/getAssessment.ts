import { Assessment } from "@/interface";
import axiosInstance from "./axios";

export const getAssessmentById = async (assessmentId: string) : Promise<Assessment> => {
    try {
        const response = await axiosInstance.get(`/api/assessment/${assessmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching assessment:', error);
        throw error; 
    }
};
