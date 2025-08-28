import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, User, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string | null>(null);

  // Check login status from localStorage on mount
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.username);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    // Remove JWT & user info from storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserName(null);
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/top-technologies", label: "TOP TECHNOLOGY" },
    { path: "/favorites", label: "MY FAVOURITE" },
    { path: "/create-knowledge", label: "CREATE KNOWLEDGE" },
  ];

  const isLoggedIn = !!userName;

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 h-auto"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">{userName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
