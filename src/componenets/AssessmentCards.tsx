import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Assessment } from "@/interface";
import useAssessmentStore from "@/store/assessment";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
interface AssessmentListProps {
  assessments: Assessment[];
}

const severityColors = {
  Mild: "bg-yellow-200 text-yellow-800",
  Minimal: "bg-green-200 text-green-800",
  Moderate: "bg-orange-200 text-orange-800",
  "Moderately Severe": "bg-red-200 text-red-800",
  Severe: "bg-red-500 text-white",
};

export default function AssessmentCards({ assessments }: AssessmentListProps) {
  const setAssessmentId = useAssessmentStore((state) => state.setAssessmentId);
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <Card
          key={assessment._id}
          onClick={() => {
            navigate("/dashboard"), setAssessmentId(assessment._id);
          }}
          className="overflow-hidden  cursor-pointer"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant="secondary"
                className={`${
                  severityColors[assessment.severity]
                } px-2 py-1 text-xs font-semibold rounded-full`}
              >
                {assessment.severity}
              </Badge>
              <span className="text-sm text-gray-500">
                {format(new Date(assessment.date), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Score: {assessment.totalScore}
              </span>
              <div className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      assessment.severity === "Severe"
                        ? "#EF4444"
                        : assessment.severity === "Moderately Severe"
                        ? "#F87171"
                        : assessment.severity === "Moderate"
                        ? "#FBBF24"
                        : assessment.severity === "Mild"
                        ? "#FCD34D"
                        : "#10B981",
                  }}
                />
                <span className="text-xs text-gray-500">
                  {assessment.severity === "Severe"
                    ? "High Risk"
                    : assessment.severity === "Moderately Severe"
                    ? "Elevated Risk"
                    : assessment.severity === "Moderate"
                    ? "Moderate Risk"
                    : assessment.severity === "Mild"
                    ? "Low Risk"
                    : "Minimal Risk"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
