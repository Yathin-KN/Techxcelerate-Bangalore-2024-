import { Assessment } from '@/interface';
import axiosInstance from './axios';


export const getAssessmentsByStudentId = async (studentId: string): Promise<Assessment[]> => {
    try {
        const response = await axiosInstance.get<{ message: string; assessments: Assessment[] }>(`/api/assessmentsByStudentId/${studentId}`);
        return response.data.assessments;
    } catch (error) {
        console.error("Error fetching assessments:", error);
        throw new Error('Failed to fetch assessments');
    }
};
