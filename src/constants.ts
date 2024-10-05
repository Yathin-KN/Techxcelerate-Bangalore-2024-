import { ActivitySuggestion } from "./interface";

export const activitySuggestions: ActivitySuggestion[] = [
    {
        severityLevel: "Minimal",
        activities: [
            { day: "Monday", activity: "Take a 15-minute walk in nature." },
            { day: "Tuesday", activity: "Read a chapter of a new book." },
            { day: "Wednesday", activity: "Listen to soothing music for 20 minutes." },
            { day: "Thursday", activity: "Try a simple meditation or breathing exercise." },
            { day: "Friday", activity: "Spend time on a hobby you enjoy." },
            { day: "Saturday", activity: "Connect with a friend for a brief chat." },
            { day: "Sunday", activity: "Prepare a healthy meal and enjoy it mindfully." },
        ],
    },
    {
        severityLevel: "Mild",
        activities: [
            { day: "Monday", activity: "Go for a 30-minute walk or do light exercise." },
            { day: "Tuesday", activity: "Write in a gratitude journal." },
            { day: "Wednesday", activity: "Spend time with a close friend or family member." },
            { day: "Thursday", activity: "Practice a 10-minute mindfulness exercise." },
            { day: "Friday", activity: "Engage in a creative hobby (drawing, cooking, etc.)." },
            { day: "Saturday", activity: "Try a yoga session or stretching routine." },
            { day: "Sunday", activity: "Watch a feel-good movie or read a fun book." },
        ],
    },
    {
        severityLevel: "Moderate",
        activities: [
            { day: "Monday", activity: "Take a 30-minute walk in a peaceful place." },
            { day: "Tuesday", activity: "Write down your thoughts in a journal." },
            { day: "Wednesday", activity: "Do a guided meditation or relaxation session." },
            { day: "Thursday", activity: "Call a supportive friend or family member." },
            { day: "Friday", activity: "Create a list of goals for the next week." },
            { day: "Saturday", activity: "Cook a healthy meal or try a new recipe." },
            { day: "Sunday", activity: "Do light stretching or yoga." },
        ],
    },
    {
        severityLevel: "Moderately Severe",
        activities: [
            { day: "Monday", activity: "Start the day with gentle stretching." },
            { day: "Tuesday", activity: "Talk to a mental health professional if possible." },
            { day: "Wednesday", activity: "Try a guided relaxation technique." },
            { day: "Thursday", activity: "Take a short walk in a calm place." },
            { day: "Friday", activity: "Do something creative or listen to music." },
            { day: "Saturday", activity: "Spend time in a calming, quiet environment." },
            { day: "Sunday", activity: "Try a short, guided yoga session for relaxation." },
        ],
    },
    {
        severityLevel: "Severe",
        activities: [
            { day: "Monday", activity: "Reach out to a therapist or mental health professional." },
            { day: "Tuesday", activity: "Engage in deep breathing exercises for 10 minutes." },
            { day: "Wednesday", activity: "Listen to calming music or nature sounds." },
            { day: "Thursday", activity: "Take a short, peaceful walk in a natural setting." },
            { day: "Friday", activity: "Do something that makes you feel safe and comfortable." },
            { day: "Saturday", activity: "Rest as much as needed, and prioritize self-care." },
            { day: "Sunday", activity: "Engage in a brief gratitude practice or gentle meditation." },
        ],
    },
];
