import { getAssessmentById } from "@/api/getAssessment";
import { updateActivityStatus } from "@/api/updateActivityStatus";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ActivityItem, Assessment } from "@/interface";
import useAssessmentStore from "@/store/assessment";
import { CheckCircle, Circle } from "lucide-react";
import { useEffect, useState } from "react";

const Todo = () => {
  const { activities, fetchAssessment, updateActivity } = useAssessmentStore();
  const assessmentId = useAssessmentStore((state) => state.assessmentId);

  useEffect(() => {
    if (assessmentId) {
      fetchAssessment(assessmentId);
    }
  }, [assessmentId]);

  const handleUpdate = (day: string, activity: string) => {
    updateActivity(day, activity);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold ">
          {activities?.[0]?.day || "No Data"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {activities?.[0]?.activities.map((activity) => (
          <div
            key={activity.name}
            className="flex items-center justify-between p-2 rounded-lg bg-muted"
          >
            <div className="flex items-center space-x-2">
              <Toggle
                pressed={activity.completed}
                onPressedChange={() =>
                  handleUpdate(activities[0].day, activity.name)
                }
                aria-label={`Toggle ${activity.name}`}
              >
                {activity.completed ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </Toggle>
              <span className="font-medium">{activity.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdate(activities[0].day, activity.name)}
            >
              {activity.completed ? "Completed" : "Mark as done"}
            </Button>
          </div>
        ))}
      </CardContent>
    </div>
  );
};

export default Todo;
