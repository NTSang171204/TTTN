import { useState } from "react";
import { Trash2, UserPlus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15",
    avatar: "JD"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2024-01-14",
    avatar: "SJ"
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2024-01-10",
    avatar: "MC"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2024-01-15",
    avatar: "ED"
  },
  {
    id: 5,
    name: "Alex Brown",
    email: "alex@example.com",
    role: "User",
    status: "Pending",
    lastLogin: "Never",
    avatar: "AB"
  }
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelected = () => {
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
    toast({
      title: "Users deleted",
      description: `Successfully deleted ${selectedUsers.length} user(s).`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-success/10 text-success border-success/20",
      Inactive: "bg-muted text-muted-foreground border-border",
      Pending: "bg-warning/10 text-warning border-warning/20"
    };
    return variants[status as keyof typeof variants] || variants.Inactive;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your application users and their permissions.
          </p>
        </div>
        <Button className="admin-button-primary px-4 py-2">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters and Actions */}
      <Card className="admin-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="admin-button-secondary px-3 py-2">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            {selectedUsers.length > 0 && (
              <Button
                variant="destructive"
                onClick={handleDeleteSelected}
                className="px-4 py-2"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected ({selectedUsers.length})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{user.role}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}