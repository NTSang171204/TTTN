// src/pages/TopTechnologies.tsx
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import TechTag from "@/components/common/TechTag";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Eye, TrendingUp } from "lucide-react";
import { useAppAll } from "@/data/AppAllContext";
import axios from "axios";
import { Knowledge } from "@/data/mockData";

const TopTechnologies: React.FC = () => {
  const { technologiesWithStats, loading } = useAppAll();
  const [questions, setQuestions] = useState<Knowledge[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Fetch all questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Hardcode top 8 popular technologies
  const popularTechIds = technologiesWithStats?.slice(0, 8).map((t) => t.id) || [];

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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Technology</h2>
            <p className="text-gray-600">Explore technologies and their related questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologiesWithStats?.map((technology) => {
              const techQuestions = questions.filter(
                (q) => q.technology === technology.name
              );
              const isPopular = popularTechIds.includes(technology.id);

              return (
                <Card
                  key={technology.id}
                  className="shadow-kms-card hover:shadow-kms-hover transition-all duration-300 group"
                >
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                        {technology.name[0].toUpperCase()}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {technology.name}
                      </h3>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{techQuestions.length} questions</span>
                        </div>
                        {isPopular && (
                          <Badge className="bg-kms-popular text-white text-xs flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Sample Questions:</h4>
                        <div className="space-y-2">
                          {techQuestions.slice(0, 3).map((question) => (
                            <Link
                              key={question.id}
                              to={`/question/${question.id}`}
                              className="block text-sm text-gray-600 hover:text-primary transition-colors line-clamp-1"
                            >
                              • {question.title}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Link
                          to={`/search?technology=${encodeURIComponent(technology.name)}`}
                          className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          View all {technology.name} questions →
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Statistics Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technology Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-kms-card text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {technologiesWithStats?.length || 0}
                  </div>
                  <div className="text-gray-600">Technologies Available</div>
                </CardContent>
              </Card>

              <Card className="shadow-kms-card text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {questions.length}
                  </div>
                  <div className="text-gray-600">Total Questions</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTechnologies;
