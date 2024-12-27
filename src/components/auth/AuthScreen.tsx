import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Github, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/logo.png";
import { forwardRef } from "react";
import { log } from "console";

interface AuthScreenProps {
  mode: "login" | "signup";
  onToggleMode: (mode: "login" | "signup") => void;
  onSuccess: () => void;
}

export const AuthScreen = forwardRef<HTMLDivElement, AuthScreenProps>(
  ({ mode, onToggleMode, onSuccess }, ref) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const resetForm = () => {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      // Basic validation
      if (!email || !password) {
        setError("Please fill in all required fields");
        return;
      }

      // Additional validation for signup
      if (mode === "signup") {
        if (!confirmPassword) {
          setError("Please confirm your password");
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        onSuccess();
      } else {
        // For login, simulate authentication
        if (email === "test@example.com" && password === "password") {
          onSuccess();
          navigate('/dashboard');
        } else {
          setError("Invalid credentials");
        }
      }
    };

    const handleDemoLogin = () => {
      onSuccess();
      navigate('/dashboard');
    };

    const handleModeToggle = (newMode: "login" | "signup") => {
      resetForm();
      onToggleMode(newMode);
    };

    return (
      <div
        ref={ref}
        className="min-h-screen  flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md bg-white/80 border-[#3B6064]/20 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-3">
              <img src={logo} alt="Logo" className="w-20" />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-[#03012C]">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </CardTitle>
            <CardDescription className="text-center text-[#3B6064]">
              {mode === "login"
                ? "Enter your credentials to access your account"
                : "Enter your details to create your account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full hover:border-[#26A96C] border-slate-400 hover:text-[#26A96C] transition-colors"
                  onClick={handleDemoLogin}
                >
                  {mode === "login" ? "Demo Login" : "Demo Signup"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-[#3B6064]" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 focus:border-[#26A96C] focus:ring-[#26A96C]/20 border-slate-400"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#3B6064]" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-9 focus:border-[#26A96C] focus:ring-[#26A96C]/20 border-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 text-[#3B6064] hover:text-[#26A96C]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {mode === "signup" && (
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#3B6064]" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-9 pr-9 focus:border-[#26A96C] focus:ring-[#26A96C]/20 border-slate-400"
                        required
                      />
                    </div>
                  )}
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#26A96C] hover:bg-[#26A96C]/90 text-white"
                >
                  {mode === "login" ? "Sign In" : "Sign Up"}
                </Button>

                <div className="text-center text-sm">
                  {mode === "login" ? (
                    <p className="text-[#3B6064]">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => handleModeToggle("signup")}
                        className="text-[#26A96C] hover:underline p-1"
                      >
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p className="text-[#3B6064]">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => handleModeToggle("login")}
                        className="text-[#26A96C] hover:underline p-1"
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
);

AuthScreen.displayName = "AuthScreen";
