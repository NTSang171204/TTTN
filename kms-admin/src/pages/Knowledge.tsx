import { useState } from "react";
import { CheckCircle, XCircle, Eye, Search, Filter, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock knowledge articles data
const initialArticles = [
  {
    id: 1,
    title: "How to Set Up Authentication",
    author: "John Doe",
    category: "Security",
    status: "Pending",
    createdAt: "2024-01-15",
    views: 245,
    excerpt: "A comprehensive guide on setting up secure authentication in your application..."
  },
  {
    id: 2,
    title: "Database Optimization Best Practices",
    author: "Sarah Johnson",
    category: "Database",
    status: "Approved",
    createdAt: "2024-01-14",
    views: 892,
    excerpt: "Learn the essential techniques for optimizing database performance and queries..."
  },
  {
    id: 3,
    title: "API Rate Limiting Implementation",
    author: "Mike Chen",
    category: "API",
    status: "Rejected",
    createdAt: "2024-01-13",
    views: 156,
    excerpt: "Implement effective rate limiting to protect your APIs from abuse and overload..."
  },
  {
    id: 4,
    title: "Frontend Performance Optimization",
    author: "Emily Davis",
    category: "Frontend",
    status: "Pending",
    createdAt: "2024-01-12",
    views: 423,
    excerpt: "Techniques and strategies to improve your frontend application performance..."
  },
  {
    id: 5,
    title: "Docker Container Best Practices",
    author: "Alex Brown",
    category: "DevOps",
    status: "Approved",
    createdAt: "2024-01-11",
    views: 671,
    excerpt: "Essential practices for building efficient and secure Docker containers..."
  }
];

export default function Knowledge() {
  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { toast } = useToast();

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (articleId: number) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId ? { ...article, status: "Approved" } : article
      )
    );
    toast({
      title: "Article approved",
      description: "The knowledge article has been approved successfully.",
    });
  };

  const handleReject = (articleId: number) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId ? { ...article, status: "Rejected" } : article
      )
    );
    toast({
      title: "Article rejected",
      description: "The knowledge article has been rejected.",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Approved: "bg-success/10 text-success border-success/20",
      Rejected: "bg-destructive/10 text-destructive border-destructive/20",
      Pending: "bg-warning/10 text-warning border-warning/20"
    };
    return variants[status as keyof typeof variants] || variants.Pending;
  };

  const statusCounts = articles.reduce((acc, article) => {
    acc[article.status] = (acc[article.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Knowledge Management</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage knowledge articles submitted by users.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Articles</p>
                <p className="text-2xl font-bold text-foreground">{articles.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Eye className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{statusCounts.Pending || 0}</p>
              </div>
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="h-4 w-4 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">{statusCounts.Approved || 0}</p>
              </div>
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-destructive">{statusCounts.Rejected || 0}</p>
              </div>
              <div className="p-2 rounded-lg bg-destructive/10">
                <XCircle className="h-4 w-4 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="admin-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Articles List */}
      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="admin-card hover:shadow-elevated transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-foreground mb-1">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {article.excerpt}
                  </CardDescription>
                </div>
                <Badge variant="outline" className={getStatusBadge(article.status)}>
                  {article.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Category: {article.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{article.views} views</span>
                  </div>
                  <span>{article.createdAt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="admin-button-secondary">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {article.status === "Pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(article.id)}
                        className="bg-success hover:bg-success/90 text-success-foreground"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(article.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="admin-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}