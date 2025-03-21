import { Link, useNavigate } from "react-router-dom"
import { Code } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const responseData = await response.json();
      console.log("Full response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      // Extract data from the nested structure
      const { data } = responseData;
      
      if (!data || !data.token) {
        console.error("No token found in response");
        throw new Error("Invalid response format from server");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      
      // Store user data
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("User data stored:", data.user);
      } else {
        console.error("No user data found in response");
      }

      toast.success("Logged in successfully!");
      
      // Navigate based on account type
      setTimeout(() => {
        if (data.user && data.user.accountType) {
          navigateBasedOnAccountType(data.user.accountType);
        } else {
          console.log("No account type found, navigating to home");
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to navigate based on account type
  const navigateBasedOnAccountType = (accountType: string) => {
    console.log("Navigating based on account type:", accountType);
    
    if (accountType === "API Consumer") {
      navigate("/customerDashboard");
    } else if (accountType === "API Provider") {
      navigate("/providerDashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="hidden lg:block lg:w-1/2 h-screen">
        <img 
          src="src/assets/login.png" 
          alt="Login illustration" 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-4 py-8 bg-background h-screen overflow-y-auto">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <Code className="h-6 w-6" />
          <span className="text-xl font-bold">APIMarket</span>
        </Link>
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="johndoe@gmail.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
          <Separator className="my-4" />
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Continue with Google
            </Button>
          </div>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

