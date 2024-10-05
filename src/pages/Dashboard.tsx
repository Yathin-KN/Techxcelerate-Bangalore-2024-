import {  User } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useAssessmentStore from "@/store/assessment";
import Main from "@/layouts/Main";
import { useEffect, useState } from "react";
import {  ActivityItem, UserState } from "@/interface";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Todo from "./Todo";

export const description = "A bar chart";

interface chartDataInterface {
  day: string;
  tasks: number;
}



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Dashboard() {
  const { activities, fetchAssessment } = useAssessmentStore();
  const [data, setData] = useState<chartDataInterface[]>([]);
  const assessmentId = useAssessmentStore((state) => state.assessmentId);
  const auth: UserState | null = useAuthUser();

  const formatData = (arr: ActivityItem[]) => {
    const newArr: chartDataInterface[] = arr.map((item) => {
      const tasks = item.activities.reduce(
        (acc, activity) => acc + Number(activity.completed),
        0
      );
      return { day: item.day, tasks };
    });
    return newArr;
  };

  useEffect(() => {
    if (assessmentId) {
      fetchAssessment(assessmentId);
    }
  }, [assessmentId]);

  useEffect(() => {
    if (activities?.length) {
      setData(formatData(activities));
    }
  }, [activities]);

  return (
    <Main>
      <div className=" grid grid-cols-3 gap-4">
        <div className="border rounded-md p-4">
          <div className="flex items-center gap-5  pl-4 ">
            <div className="flex items-center justify-center">
              <User size={42} />
            </div>
            <div>
              <div className="flex gap-4">
                <p>User id :</p>
                <p>{auth?.userId}</p>{" "}
              </div>
              <div className="flex gap-4">
                <p>Name :</p>
                <p>{auth?.username}</p>{" "}
              </div>
            </div>
          </div>
          <div>
            <Todo />
          </div>
        </div>
        <Card className=" col-span-2">
          <CardHeader>
            <CardTitle>Activity Chart</CardTitle>
            <CardDescription>Monday - Sunday</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="tasks" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            {/* <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div> */}
            <div className="leading-none text-muted-foreground">
              Showing total tasks completed each day
            </div>
          </CardFooter>
        </Card>
      </div>
    </Main>
  );
}
