import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const AdminHeader = () => {
  return (
    <header className="gradient-header text-primary-foreground border-b border-primary-light/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/70 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-primary-foreground/10 border-primary-light/20 text-primary-foreground placeholder:text-primary-foreground/70 focus:bg-primary-foreground/20"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-light/20 relative"
          >
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-primary-light/20">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary-foreground text-primary text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-primary-foreground/70">Administrator</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};