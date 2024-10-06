import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import signUpRequest from "@/api/signUp";
import { SignUpRequest } from "@/interface";
import { useNavigate } from "react-router-dom";
import Main from "@/layouts/Main";

export default function SignupPage() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigate();

  const signUp = async (data: SignUpRequest) => {
    setIsLoading(true);
    try {
      const response = await signUpRequest(data);
      console.log(response);
      toast.success("Sign-up successful! Redirecting to sign-in page...");
      setTimeout(() => navigation("/signin"), 2000);
    } catch (err) {
      console.error("Sign-up failed:", err);
      toast.error("Sign-up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    signUp({
      username: name,
      password,
    });
  };

  return (
    <Main>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex w-full max-w-4xl shadow-lg">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Sign Up
              </CardTitle>
              <CardDescription className="text-center">
                Create a new account to get started.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full transition duration-200 ease-in-out bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing Up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          <div className="hidden md:block w-full max-w-md">
            <svg
              className="w-full h-full"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="smallGrid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
                <pattern
                  id="grid"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="100" height="100" fill="url(#smallGrid)" />
                  <path
                    d="M 100 0 L 0 0 0 100"
                    fill="none"
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="#3b82f6"
                fillOpacity="0.1"
              />
              <circle
                cx="200"
                cy="200"
                r="100"
                fill="#3b82f6"
                fillOpacity="0.2"
              />
              <circle
                cx="200"
                cy="200"
                r="50"
                fill="#3b82f6"
                fillOpacity="0.3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Main>
  );
}
