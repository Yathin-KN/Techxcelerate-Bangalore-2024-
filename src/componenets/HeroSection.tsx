import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MessageSquare, BookOpen, BarChart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
              Level Up Your Mind with MindQuest
            </h1>
            <p className="max-w-[600px] pt-5 text-md text-gray-600  mx-auto">
              Embark on a journey of self-discovery and mental wellness. Our
              AI-powered app turns your daily mental health check-ins into an
              exciting quest for personal growth.
            </p>
          </div>
        </div>
        <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                AI Chatbot
              </CardTitle>
              <CardDescription>
                Engage with our AI-powered chatbot for personalized mental
                health support and guidance anytime, anywhere.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Wellness Blogs
              </CardTitle>
              <CardDescription>
                Access a wealth of curated articles and blogs on mental health,
                written by experts and tailored to student life.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-6 h-6" />
                Real-time Analytics
              </CardTitle>
              <CardDescription>
                Track your mental wellness journey with real-time analytics,
                helping you identify patterns and progress over time.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
