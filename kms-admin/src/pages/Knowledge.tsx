
import { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, Eye, Search, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import type { Knowledge } from "@/data/adminData";

export default function AdminKnowledge() {
  const [articles, setArticles] = useState<Knowledge[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { toast } = useToast();

  // Fetch articles
  const fetchArticles = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/knowledge");
      setArticles(data);
    } catch (error) {
      console.error("Error fetching knowledge:", error);
      toast({
        title: "Error",
        description: "Failed to fetch knowledge articles",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Update status
  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const { data } = await axios.patch(`http://localhost:3000/api/knowledge/${id}/status`, { status });
      setArticles(prev =>
        prev.map(article =>
          article.id === id ? { ...article, status: data.knowledge.status } : article
        )
      );
      toast({
        title: `Article ${status}`,
        description: `The knowledge article has been ${status.toLowerCase()} successfully.`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update article status.",
        variant: "destructive",
      });
    }
  };

  // Filtered list
  const filteredArticles = articles.filter(article => {
    const status = article.status ?? "Pending";
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.technology.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.level?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesStatus = statusFilter === "All" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string | null) => {
    const s = status ?? "Pending";
    const variants = {
      Approved: "bg-success/10 text-success border-success/20",
      Rejected: "bg-destructive/10 text-destructive border-destructive/20",
      Pending: "bg-warning/10 text-warning border-warning/20"
    };
    return variants[s as keyof typeof variants];
  };

  const statusCounts = articles.reduce((acc, article) => {
    const s = article.status ?? "Pending";
    acc[s] = (acc[s] || 0) + 1;
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
        {/* Total / Pending / Approved / Rejected cards */}
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
                  <CardTitle className="text-lg font-semibold text-foreground mb-1">{article.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{article.content}</CardDescription>
                </div>
                <Badge variant="outline" className={getStatusBadge(article.status)}>
                  {article.status ?? "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1"><User className="h-4 w-4" /><span>{article.author}</span></div>
                  <div className="flex items-center space-x-1">
                    <span>Category: {article.technology}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Level: {article.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" /><span>{article.view_count} views</span>
                  </div>
                  <span>{new Date(article.created_at).toLocaleDateString()}</span>
                </div>
                {article.status === null || article.status === "Pending" ? (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-success text-white" onClick={() => handleUpdateStatus(article.id, "Approved")}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Approve
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleUpdateStatus(article.id, "Rejected")}>
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </div>
                ) : null}
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
