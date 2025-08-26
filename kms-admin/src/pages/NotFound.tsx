import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="admin-card max-w-md w-full text-center">
        <CardContent className="pt-8 pb-8">
          <div className="p-4 rounded-full bg-destructive/10 inline-flex items-center justify-center mb-6">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
          <h2 className="text-xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="admin-button-primary">
            <a href="/dashboard" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Return to Dashboard
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
