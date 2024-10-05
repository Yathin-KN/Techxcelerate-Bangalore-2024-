import { getAssessmentById } from '@/api/getAssessment';
import { updateActivityStatus } from '@/api/updateActivityStatus';
import { Assessment } from '@/interface';
import { create } from 'zustand';
export interface Activities {
    day: string;
    activities: {
        name: string;
        completed: boolean;
    }[];
}
export interface AssessmentState {
    assessmentId: string | null;
    activities: Activities[] | null,
    setAssessmentId: (id: string) => void;
    updateAssessmentId: (id: string) => void;
    removeAssessmentId: () => void;
    setActivites: (activities: Activities[]) => void;
    fetchAssessment: (id: string) => Promise<void>;
    updateActivity: (day: string, activity: string) => Promise<void>;
}

const useAssessmentStore = create<AssessmentState>((set , get) => ({
    assessmentId: null,
    activities: null,
    setAssessmentId: (id: string) => set({ assessmentId: id }),
    setActivites: (activities: Activities[] | null) => set({
        activities: activities
    }),
    updateAssessmentId: (id: string) => set({ assessmentId: id }),
    updateActivites: (activities: Activities[] | null) => set({
        activities: activities
    }),
    removeAssessmentId: () => set({ assessmentId: null }),
    fetchAssessment: async (id: string) => {
        try {
            const data: Assessment = await getAssessmentById(id);
            set({ activities: data.activities });
        } catch (error) {
            console.error("Error fetching assessment:", error);
        }
    },

    updateActivity: async (day: string, activity: string) => {
        try {
            const { assessmentId } = get(); 
            if (!assessmentId) throw new Error("Assessment ID is not set");

            const activityName = activity;
            const requestData = { completed: true };

            await updateActivityStatus(assessmentId, day, activityName, requestData);

            set((state) => ({
                activities: state.activities.map((item) =>
                    item.day === day
                        ? {
                            ...item,
                            activities: item.activities.map((act) =>
                                act.name === activityName
                                    ? { ...act, completed: true }
                                    : act
                            ),
                        }
                        : item
                ),
            }));
        } catch (error) {
            console.error("Error updating activity status:", error);
        }
    },
}));

export default useAssessmentStore;
