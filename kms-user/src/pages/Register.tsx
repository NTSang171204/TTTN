import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, User, Mail, Building } from "lucide-react";
import { Users } from "lucide-react";
import {register} from "@/services/api";
import { toast } from "sonner";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      const { data } = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      toast.success("Register successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <h1 className="text-4xl font-bold">Join Our KMS</h1>
            <p className="text-xl text-white/80">Start managing knowledge effectively</p>
          </div>
        </div>

        {/* Register Form Side */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-primary">Create Account</CardTitle>
              <CardDescription>
                Fill in the details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">User Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Your name"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white">
                  Create Account
                </Button>
              </form>
              <div className="mt-6 text-center">
                <div className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in here
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

export default Register;