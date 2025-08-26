import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import TechTag from "@/components/common/TechTag";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, MessageCircle, ArrowLeft, Heart } from "lucide-react";
import { mockQuestions, recentSearches, popularQuestions } from "@/data/mockData";
import { useUserInteraction } from "@/contexts/UserInteractionContext";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, toggleLike, toggleDislike, isFavorited, isLiked, isDisliked } = useUserInteraction();
  const question = mockQuestions.find(q => q.id === id);

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
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="shadow-kms-card">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                      {question.title}
                      {question.isPopular && (
                        <Badge className="bg-kms-popular text-white">Popular</Badge>
                      )}
                    </h1>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleFavorite(question.id)}
                      className={`${
                        isFavorited(question.id) 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-500 hover:text-red-500'
                      } transition-colors`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorited(question.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {question.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t pt-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleLike(question.id)}
                          className={`${
                            isLiked(question.id) 
                              ? 'text-blue-600 hover:text-blue-700' 
                              : 'text-gray-500 hover:text-blue-600'
                          } transition-colors`}
                        >
                          <ThumbsUp className={`h-4 w-4 mr-1 ${isLiked(question.id) ? 'fill-current' : ''}`} />
                          {question.votes.up + (isLiked(question.id) ? 1 : 0)}
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleDislike(question.id)}
                          className={`${
                            isDisliked(question.id) 
                              ? 'text-red-600 hover:text-red-700' 
                              : 'text-gray-500 hover:text-red-600'
                          } transition-colors`}
                        >
                          <ThumbsDown className={`h-4 w-4 mr-1 ${isDisliked(question.id) ? 'fill-current' : ''}`} />
                          {question.votes.down + (isDisliked(question.id) ? 1 : 0)}
                        </Button>
                      </div>
                      <Link to={`/question/${question.id}/comments`}>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {question.comments.length} Comments
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{question.technology}</Badge>
                      <Badge variant="outline">{question.client}</Badge>
                      <Badge variant="outline">{question.level}</Badge>
                    </div>
                  </div>

                  {question.tags.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag) => (
                          <TechTag key={tag} name={tag} />
                        ))}
                      </div>
                    </div>
                  )}
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
                    {popularQuestions.slice(0, 6).map((title, index) => (
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

export default QuestionDetail;