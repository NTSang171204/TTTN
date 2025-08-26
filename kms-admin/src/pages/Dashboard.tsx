import { Users, BookOpen, Code, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const statsCards = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    description: "Active users this month"
  },
  {
    title: "Total Knowledge",
    value: "1,247",
    change: "+8%",
    changeType: "positive" as const,
    icon: BookOpen,
    description: "Knowledge articles"
  },
  {
    title: "Total Technologies",
    value: "89",
    change: "+3%",
    changeType: "positive" as const,
    icon: Code,
    description: "Integrated technologies"
  }
];

const recentActivity = [
  {
    id: 1,
    action: "New user registered",
    user: "Sarah Johnson",
    timestamp: "2 minutes ago",
    type: "user"
  },
  {
    id: 2,
    action: "Knowledge article approved",
    user: "Mike Chen",
    timestamp: "1 hour ago",
    type: "knowledge"
  },
  {
    id: 3,
    action: "System update completed",
    user: "System",
    timestamp: "3 hours ago",
    type: "system"
  },
  {
    id: 4,
    action: "User permissions updated",
    user: "Alex Brown",
    timestamp: "5 hours ago",
    type: "user"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your admin panel.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card key={card.title} className="admin-card hover:shadow-elevated transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-primary/10">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-2xl font-bold text-foreground">{card.value}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-success font-medium">{card.change}</span>
                  <span className="text-sm text-muted-foreground">{card.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest actions and updates in your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="p-1 rounded-full bg-primary/10">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used admin actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="admin-button-primary p-4 text-center rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Add User</span>
              </button>
              <button className="admin-button-secondary p-4 text-center rounded-lg">
                <BookOpen className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">New Article</span>
              </button>
              <button className="admin-button-secondary p-4 text-center rounded-lg">
                <Code className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">System Settings</span>
              </button>
              <button className="admin-button-secondary p-4 text-center rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">View Reports</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}