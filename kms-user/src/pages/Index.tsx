import Header from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import TechTag from "@/components/common/TechTag";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Heart, MessageCircle } from "lucide-react";
import { mockTechnologies, mockQuestions, recentSearches } from "@/data/mockData";
import { useUserInteraction } from "@/contexts/UserInteractionContext";


const Index = () => {

  const { toggleFavorite, isFavorited } = useUserInteraction();
  const popularQuestions = mockQuestions.filter(q => q.isPopular);
  const featuredTechnologies = mockTechnologies.slice(0, 3);

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
          
          <SearchBar/>
          
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

      {/* Content Sections */}
      <div className="bg-gray-50 px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* My Technology Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">My Technology</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTechnologies.map((technology) => {
                const techQuestions = mockQuestions.filter(q => q.technology === technology.name);
                
                return (
                  <Card key={technology.id} className="shadow-kms-card hover:shadow-kms-hover transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-xl">
                          {technology.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{technology.name}</h3>
                          {technology.isPopular && (
                            <Badge className="bg-kms-popular text-white text-xs">Popular</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {techQuestions.slice(0, 4).map((question) => (
                          <Link
                            key={question.id}
                            to={`/question/${question.id}`}
                            className="block text-sm text-gray-600 hover:text-primary transition-colors"
                          >
                            {question.title}
                          </Link>
                        ))}
                        
                        <Link
                          to={`/search?technology=${encodeURIComponent(technology.name)}`}
                          className="block text-sm text-primary hover:text-primary/80 font-medium"
                        >
                          View all {technology.name} questions →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* My Favourite Questions Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">My Favourite Questions</h2>
              <Link to="/favorites" className="text-primary hover:text-primary/80 font-medium">
                View all →
              </Link>
            </div>
            
            <div className="space-y-4">
              {popularQuestions.slice(0, 10).map((question) => (
                <Card key={question.id} className="shadow-kms-card hover:shadow-kms-hover transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Link 
                          to={`/question/${question.id}`}
                          className="text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          {question.title}
                        </Link>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {question.technology}
                          </Badge>
                          {question.isPopular && (
                            <TechTag name="Popular" isPopular />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{question.votes.up + question.votes.down}</span>
                        </div>
                        <Link 
                          to={`/question/${question.id}/comments`}
                          className="flex items-center space-x-1 hover:text-primary transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>{question.comments.length}</span>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleFavorite(question.id)}
                          className={`${
                            isFavorited(question.id) 
                              ? 'text-red-500 hover:text-red-600' 
                              : 'text-gray-300 hover:text-red-500'
                          } transition-colors`}
                        >
                          <Heart className={`h-4 w-4 ${isFavorited(question.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">© All rights reserved. innova solutions @ 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
