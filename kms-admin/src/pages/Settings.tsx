import { Settings as SettingsIcon, User, Shield, Bell, Palette, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your admin panel configuration and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <span>General Settings</span>
            </CardTitle>
            <CardDescription>
              Basic configuration for your admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue="Admin Panel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@example.com" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable to restrict access to administrators only
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* User Management Settings */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>User Management</span>
            </CardTitle>
            <CardDescription>
              Configure user registration and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow User Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Allow new users to register accounts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Verification Required</Label>
                <p className="text-sm text-muted-foreground">
                  Require email verification for new accounts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="default-role">Default User Role</Label>
              <select
                id="default-role"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                defaultValue="User"
              >
                <option value="User">User</option>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Security</span>
            </CardTitle>
            <CardDescription>
              Security and authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="120" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login Rate Limiting</Label>
                <p className="text-sm text-muted-foreground">
                  Limit failed login attempts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive browser push notifications
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly activity reports
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Card className="admin-card">
        <CardContent className="pt-6">
          <div className="flex justify-end space-x-4">
            <Button variant="outline" className="admin-button-secondary">
              Cancel
            </Button>
            <Button className="admin-button-primary">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}