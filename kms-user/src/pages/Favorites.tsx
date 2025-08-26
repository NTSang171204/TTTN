import Header from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import TechTag from "@/components/common/TechTag";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, TrendingUp, Users, HelpCircle, Eye } from "lucide-react";
import { mockTechnologies, mockClients, mockQuestions, recentSearches, popularQuestions } from "@/data/mockData";

const Favorites = () => {
  // Mock favorite items - in a real app this would come from user data/localStorage
  const favoriteClients = mockClients.slice(0, 3);
  const favoriteTechnologies = mockTechnologies.filter(t => t.isPopular);
  const favoriteQuestions = mockQuestions.filter(q => q.isPopular).slice(0, 5);

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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">My Favourite</h2>
              <p className="text-gray-600">Your saved clients, technologies, and questions</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <Link to="/favorites" className="text-primary hover:underline">
                View all
              </Link>
            </div>
          </div>

          {/* Favorite Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Favorite Technologies */}
            <Card className="shadow-kms-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-kms-popular" />
                    Technology
                  </h3>
                  <Badge className="bg-kms-popular/10 text-kms-popular">
                    {favoriteTechnologies.length}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {favoriteTechnologies.map((tech) => (
                    <div key={tech.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-kms-popular/20 rounded flex items-center justify-center">
                          {tech.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{tech.name}</div>
                          <div className="text-xs text-gray-500">
                            {tech.questionCount} questions
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to="/top-technologies"
                  className="block text-center text-sm text-primary hover:text-primary/80 mt-4 font-medium"
                >
                  +10 more →
                </Link>
              </CardContent>
            </Card>

            {/* Favorite Questions */}
            <Card className="shadow-kms-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-accent" />
                    Questions
                  </h3>
                  <Badge className="bg-accent/10 text-accent">
                    {favoriteQuestions.length}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {favoriteQuestions.map((question) => (
                    <div key={question.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <Link 
                          to={`/question/${question.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2 flex-1"
                        >
                          {question.title}
                        </Link>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 ml-2">
                          <Heart className="h-3 w-3 fill-current" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {question.technology}
                        </Badge>
                        {question.isPopular && (
                          <TechTag name="Popular" isPopular />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to="/search"
                  className="block text-center text-sm text-primary hover:text-primary/80 mt-4 font-medium"
                >
                  +50 more →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Top Technology and Questions Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Technology */}
            <Card className="shadow-kms-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Top Technology</h3>
                  <Link to="/top-technologies" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                
                <div className="space-y-6">
                  {mockTechnologies.slice(0, 3).map((tech) => (
                    <div key={tech.id}>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          {tech.icon}
                        </div>
                        <span className="font-medium text-gray-900">{tech.name}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {mockQuestions
                          .filter(q => q.technology === tech.name)
                          .slice(0, 2)
                          .map((question) => (
                            <Link
                              key={question.id}
                              to={`/question/${question.id}`}
                              className="block text-sm text-gray-600 hover:text-primary transition-colors"
                            >
                              {question.title}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Questions */}
            <Card className="shadow-kms-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Top Questions</h3>
                  <Link to="/search" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {popularQuestions.map((title, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-kms-popular/20 rounded flex items-center justify-center text-xs font-bold text-kms-popular mt-0.5">
                        {index + 1}
                      </div>
                      <Link 
                        to="#"
                        className="text-sm text-gray-600 hover:text-primary transition-colors line-clamp-2 flex-1"
                      >
                        {title}
                        {index < 3 && (
                          <TechTag name="Popular" isPopular />
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;