import { Link, useNavigate } from "react-router-dom"
import { Code } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // Initialize accountType with a default value
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "API Consumer", // Set a default value
    termsAccepted: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    
    // Special handling for the terms checkbox
    if (id === "terms") {
      setFormData(prev => ({
        ...prev,
        termsAccepted: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id === "confirm-password" ? "confirmPassword" : id]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleAccountTypeSelect = (type: string) => {
    setFormData(prev => ({
      ...prev,
      accountType: type
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.termsAccepted) {
      toast.error("You must accept the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          accountType: formData.accountType,
          termsAccepted: formData.termsAccepted
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Account created successfully!");
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
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
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Enter your information to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="John" 
                required 
                value={formData.username}
                onChange={handleChange}
              />
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Account Type</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  type="button"
                  variant={formData.accountType === "API Consumer" ? "default" : "outline"} 
                  className="justify-start border-2 p-4 h-auto"
                  onClick={() => handleAccountTypeSelect("API Consumer")}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold">API Consumer</span>
                    <span className="text-xs text-muted-foreground">I want to buy and use APIs</span>
                  </div>
                </Button>
                <Button 
                  type="button"
                  variant={formData.accountType === "API Provider" ? "default" : "outline"} 
                  className="justify-start border-2 p-4 h-auto"
                  onClick={() => handleAccountTypeSelect("API Provider")}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold">API Provider</span>
                    <span className="text-xs text-muted-foreground">I want to sell my APIs</span>
                  </div>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
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
              Sign up with Google
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}