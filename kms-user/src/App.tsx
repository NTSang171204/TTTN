import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserInteractionProvider } from "@/contexts/UserInteractionContext";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import QuestionDetail from "./pages/QuestionDetail";
import Comments from "./pages/Comments";
import TopTechnologies from "./pages/TopTechnologies";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateKnowledge from "./pages/CreateKnowledge";
import NotFound from "./pages/NotFound";
import { AppAllProvider } from "./data/AppAllContext";
import { SearchProvider } from "./contexts/SearchContext";
import { FloatingChat } from "./components/ui/floating-chat";
import ProtectedRoute from "./components/routes/ProtectedRoute";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppAllProvider>
      <SearchProvider>
        <TooltipProvider>
          <UserInteractionProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={ <ProtectedRoute> <Index /></ProtectedRoute> } />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/question/:id" element={<QuestionDetail />} />
                <Route path="/question/:id/comments" element={<Comments />} />
                <Route path="/top-technologies" element={<TopTechnologies />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-knowledge" element={<CreateKnowledge />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FloatingChat />
            </BrowserRouter>
          </UserInteractionProvider>
        </TooltipProvider>
      </SearchProvider>
    </AppAllProvider>
  </QueryClientProvider>

);

export default App;
