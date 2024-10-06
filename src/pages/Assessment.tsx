import React, { useEffect, useState } from "react";
import axios from "axios";
import Main from "@/layouts/Main";
import submitAssessment from "@/api/assesment";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { UserState, Assessment as Assess } from "@/interface";
import useAssessmentStore from "@/store/assessment";
import { useNavigate } from "react-router-dom";
import { getAssessmentsByStudentId } from "@/api/getAllAssessments";
import AssessmentCards from "@/componenets/AssessmentCards";
const questions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
  "Trouble concentrating on things, such as reading the newspaper or watching television?",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
  "Thoughts that you would be better off dead, or of hurting yourself in some way?",
];

const options = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

const Assessment = () => {
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(0));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [assesmentId, setAssessmentId] = useState<string | null>(null);
  const handleChange = (index: number, value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const [assessments, setAssessments] = useState<Assess[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useAuthUser<UserState>();
  const setStoreAssessmentId = useAssessmentStore(
    (state) => state.setAssessmentId
  );
  const setStoreActivities = useAssessmentStore((state) => state.setActivites);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await submitAssessment({
        studentId: auth?.userId as string,
        answers,
      });
      setResult(
        `Severity: ${response.severity}. Suggested Plan: ${response.suggestedPlan}`
      );
      setAssessmentId(response.assessmentId);
      setStoreAssessmentId(response.assessmentId);
      setStoreActivities(response.activities);
      console.log(response.activities);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting assessment:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssessments = async () => {
    try {
      const data = await getAssessmentsByStudentId(auth?.userId || "  ");
      setAssessments(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load assessments");
      setLoading(false);
    }
  };

  useEffect(()=>{
     fetchAssessments()
  },[])

  return (
    <Main>
      <div className=" w-full grid  grid-cols-3">
        <Card className=" max-w-2xl mx-auto col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              PHQ-9 Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 ">
            {questions.map((question, index) => (
              <div key={index} className="space-y-2 row-span-1">
                <Label
                  htmlFor={`question-${index}`}
                  className="text-sm font-medium"
                >
                  {question}
                </Label>
                <Select
                  value={answers[index].toString()}
                  onValueChange={(value) =>
                    handleChange(index, parseInt(value))
                  }
                >
                  <SelectTrigger id={`question-${index}`} className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
            {result && (
              <p className="text-center text-sm font-medium text-primary">
                {result}
              </p>
            )}
          </CardFooter>
        </Card>
        <div className=" col-span-1 border rounded-md p-4">
          <div>
            <h3 className=" text-xl font-semibold">Assessments History</h3>
            {/* {assessments.map((assessment) => (
              <div key={assessment._id}>
                <p>Severity: {assessment.severity}</p>
                <p>Score: {assessment.totalScore}</p>
              </div>
            ))} */}
            <AssessmentCards assessments={assessments}/>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Assessment;
