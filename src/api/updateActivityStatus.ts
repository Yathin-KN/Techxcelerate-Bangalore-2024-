import { UpdateActivityStatusRequest, UpdateActivityStatusResponse } from "@/interface";
import axiosInstance from "./axios";
import { AxiosResponse } from "axios";


export const updateActivityStatus = async (
    assessmentId: string,
    day: string,
    activityName: string,
    requestData: UpdateActivityStatusRequest
  ): Promise<UpdateActivityStatusResponse> => {
    try {
      const response: AxiosResponse<UpdateActivityStatusResponse> = await axiosInstance.put(
        `api/assessments/${assessmentId}/activities/${day}/${activityName}`,
        requestData
      );
      return response.data; 
    } catch (error) {
      console.error('Error updating activity status:', error);
      throw error; 
    }
  };
  