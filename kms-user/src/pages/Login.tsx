import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Users } from "lucide-react";
import {login} from "@/services/api";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ email: email, password });
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary-light flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Illustration Side */}
        <div className="hidden lg:flex flex-col items-center justify-center text-white space-y-6">
          <div className="w-96 h-96 flex items-center justify-center">
            <Users size={200} className="text-white/20" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Welcome to KMS</h1>
            <p className="text-xl text-white/80">Your Knowledge Management System</p>
          </div>
        </div>

        {/* Login Form Side */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-primary">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white">
                  Sign In
                </Button>
              </form>
              <div className="mt-6 text-center space-y-4">
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </Link>
                <div className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary hover:underline font-medium">
                    Sign up here
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;