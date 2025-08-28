import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock logged in state - in real app this would come from auth context
  const isLoggedIn = true;
  const userName = "Sang";

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/top-technologies", label: "TOP TECHNOLOGY" },
    { path: "/favorites", label: "MY FAVOURITE" },
    { path: "/create-knowledge", label: "CREATE KNOWLEDGE" },
  ];

  return (
    <header className="bg-kms-hero text-primary-foreground px-6 py-4 shadow-kms-card">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-xl font-bold">innovaKMS</div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium hover:text-white/80 transition-colors relative ${
                location.pathname === item.path 
                  ? "text-white border-b-2 border-white pb-1" 
                  : "text-white/90"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 p-2"
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-white">
                <User className="h-5 w-5" />
                <span className="font-medium">{userName}</span>
              </div>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:inline-flex text-white border-white/20 hover:bg-white/20"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button 
                size="sm" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;