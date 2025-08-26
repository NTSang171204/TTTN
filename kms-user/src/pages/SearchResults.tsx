import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import TechTag from "@/components/common/TechTag";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { Knowledge, mockQuestions, recentSearches } from "@/data/mockData";
import { useUserInteraction } from "@/contexts/UserInteractionContext";
import { useSearchContext } from "@/contexts/SearchContext";
import { useEffect } from "react";

const SearchResults = () => {
  const { isLiked, isDisliked, toggleLike, toggleDislike } = useUserInteraction();
  const { results, loading, searchParams } = useSearchContext();

  // đọc params trực tiếp từ URL
  const [params] = useSearchParams();
  const technology = params.get("technology") || "";
  const level = params.get("level") || "";

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

      {/* Results Section */}
      <div className="bg-gray-50 min-h-screen px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Search result: {results.length} questions based on {technology},{" "}
              {level || "All"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Results */}
            <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div>Loading...</div>
              ) : results.length === 0 ? (
                <div>No results found</div>
              ) : (
                results.map((question: Knowledge) => (
                  <Card
                    key={question.id}
                    className="shadow-kms-card hover:shadow-kms-hover transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <Link
                        to={`/question/${question.id}`}
                        className="block hover:text-primary transition-colors"
                      >
                        <h3 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                          {question.title}
                          <Badge className="bg-kms-popular text-white text-xs">
                            Popular
                          </Badge>
                        </h3>
                      </Link>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {question.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => toggleLike(String(question.id))}
                          >
                            <ThumbsUp
                              className={`h-4 w-4 ${
                                isLiked(String(question.id))
                                  ? "text-primary"
                                  : "text-gray-500"
                              }`}
                            />
                            <span>{question.likes_count || 0}</span>
                          </div>
                          <div
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => toggleDislike(String(question.id))}
                          >
                            <ThumbsDown
                              className={`h-4 w-4 ${
                                isDisliked(String(question.id))
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            />
                            <span>{question.dislikes_count || 0}</span>
                          </div>
                          <Link
                            to={`/question/${question.id}/comments`}
                            className="flex items-center space-x-1 hover:text-primary transition-colors"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>{question.comments?.length || 0}</span>
                          </Link>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {question.technology}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.level}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Most Popular Questions */}
              <Card className="shadow-kms-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Most popular questions
                    </h3>
                    <Link
                      to="/favorites"
                      className="text-sm text-primary hover:underline"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {mockQuestions
                      .filter((q) => q.isPopular)
                      .slice(0, 5)
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
                </CardContent>
              </Card>

              {/* Popular Technology */}
              <Card className="shadow-kms-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Popular Technology
                    </h3>
                    <Link
                      to="/top-technologies"
                      className="text-sm text-primary hover:underline"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {["Java", "UX Design", "UI Developer"].map((tech) => (
                      <div key={tech} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary font-semibold text-sm">
                          {tech === "Java"
                            ? "☕"
                            : tech === "UX Design"
                            ? "UX"
                            : "💻"}
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

export default SearchResults;
