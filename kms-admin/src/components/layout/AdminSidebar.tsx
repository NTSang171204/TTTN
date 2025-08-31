import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Code
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Knowledge', href: '/knowledge', icon: BookOpen },
  { name: 'Technology', href: '/technology', icon: Code },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "gradient-sidebar text-primary-foreground transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-primary-light/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold">Admin Panel</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-primary-light/20 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary-foreground text-primary shadow-sm" 
                      : "text-primary-foreground hover:bg-primary-light/20"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-light/20">
        <div className="text-xs text-primary-foreground/70 text-center">
          {!collapsed && "Admin Dashboard v1.0"}
        </div>
      </div>
    </div>
  );
};