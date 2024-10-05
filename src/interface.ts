export interface SignUpRequest {
    username: string;
    password: string;
}

export interface SignUpResponse {
    token: string;
}

export interface SignInRequest {
    username: string;
    password: string;
}

export interface SignInResponse {
    username: string;
    token: string;
    id: string;
}


export interface AssesmentRequest {
    studentId: string;
    answers: number[];
}

export interface Activities {
    day: string;
    activities: {
        name: string;
        completed: boolean;
    }[];
}


export interface AssessmentResponse {
    severity: string;
    suggestedPlan: string;
    assessmentId: string;
    totalScore: number;
    activities: Activities[];
}



export interface UserState {
    username: string;
    userId: string;
}

export interface ActivityPlan {
    day: string;
    activity: string;
}

export interface ActivitySuggestion {
    severityLevel: string;
    activities: ActivityPlan[];
}

export interface AssessmentState {
    assessmentId: string | null;
    setAssessmentId: (id: string) => void;
    updateAssessmentId: (id: string) => void;
    removeAssessmentId: () => void;
}


export interface Activity {
    name: string;
    completed: boolean;
}

export interface Assessment {
    _id: string;
    studentId: string;
    answers: number[];
    totalScore: number;
    severity: string;
    date: Date;
    activities: ActivityItem[];
}

export interface ActivityItem {
    day: string;
    activities: Activity[]
}

// Interface for the request body
export interface UpdateActivityStatusRequest {
    completed: boolean;
}

// Interface for the API response (can vary based on your actual response)
export interface UpdateActivityStatusResponse {
    message: string;
    assessment: {
        _id: string;
        studentId: string;
        answers: number[];
        totalScore: number;
        severity: string;
        date: string;
        activities: {
            day: string;
            activities: {
                name: string;
                completed: boolean;
            }[];
        }[];
    };
}
