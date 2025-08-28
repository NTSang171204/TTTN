import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import TechTag from "@/components/common/TechTag";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Heart, User } from "lucide-react";
import { recentSearches, popularQuestions, Knowledge } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useUserInteraction } from "@/contexts/UserInteractionContext";
import { getKnowledgeById } from "@/services/api";

const Comments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggleCommentLike, isCommentLiked } = useUserInteraction();

  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [question, setQuestion] = useState<Knowledge | null>(null);

  // Fetch question details based on ID
  useEffect(() => {
    if (id) {
      getKnowledgeById(id).then(setQuestion);
    }
  }, [id]);

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Question not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitComment = () => {
    if (!newComment.trim() || !name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both your name and comment",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Comment Added",
      description: "Your comment has been successfully posted",
    });
    
    setNewComment("");
    setName("");
  };

  return (
    <div className="min-h-screen bg-kms-hero">
      <Header />
      
      {/* Hero Section with Search */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Simplify Technical Assessments for Effective Hiring
            </h1>
            <p className="text-white/90 text-lg">
              Drive Efficiency and Quality with our Cutting-edge HR KMS
            </p>
          </div>
          
          <SearchBar />
          
          {/* Recent Searches */}
          <div className="mt-6 text-center">
            <div className="text-white/80 mb-3">Recent Search:</div>
            <div className="flex flex-wrap justify-center gap-2">
              {recentSearches.map((search) => (
                <TechTag key={search} name={search} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 min-h-screen px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Question
            </Button>
            <Link to={`/question/${id}`}>
              <Button variant="outline" size="sm">
                View Question
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Question Summary */}
              <Card className="shadow-kms-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {question.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {question.content}
                  </p>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">{question.technology}</Badge>
                    <Badge variant="outline">{question.level}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="shadow-kms-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Comments ({question.comments?.length || 0})
                  </h3>
                  
                  {!question.comments || question.comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="mb-2">No comments yet.</p>
                      <p>Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {question.comments.map((comment) => (
                        <div key={comment.id} className="border-l-4 border-primary/20 pl-6 pb-6 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">User {comment.user_id}</div>
                                <div className="text-sm text-gray-500">
                                  {new Date(comment.created_at).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 

                            >
                              {/* <Heart className={`h-4 w-4 mr-1 ${isCommentLiked(comment.id) ? 'fill-current' : ''}`} />
                              TODO: thay thế bằng likes_count nếu API có */}
                            </Button>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Add Comment Form */}
              <Card className="shadow-kms-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Add Your Comment</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Comment
                      </label>
                      <Textarea
                        id="comment"
                        placeholder="Share your thoughts, insights, or ask questions..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full min-h-[120px] resize-none"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSubmitComment}
                        className="bg-kms-button hover:opacity-90"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Most Popular Questions */}
              <Card className="shadow-kms-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Most popular questions</h3>
                    <Link to="/favorites" className="text-sm text-primary hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {popularQuestions.slice(0, 5).map((title, index) => (
                      <Link
                        key={index}
                        to="#"
                        className="block text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {title}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Technology */}
              <Card className="shadow-kms-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Popular Technology</h3>
                    <Link to="/top-technologies" className="text-sm text-primary hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {['Java', 'UX Design', 'UI Developer'].map((tech) => (
                      <div key={tech} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary font-semibold text-sm">
                          {tech === 'Java' ? '☕' : tech === 'UX Design' ? 'UX' : '💻'}
                        </div>
                        <span className="text-gray-700">{tech}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
