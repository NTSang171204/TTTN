import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useAppAll } from "@/data/AppAllContext";
import { useSearchContext, SearchParams } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { technologies, loading } = useAppAll();
  const { updateSearch } = useSearchContext();
  
  const navigate = useNavigate();

  const [localParams, setLocalParams] = useState<SearchParams>({
    technology: "All Technology",
    level: "Level",
    keywords: "",
  });

  const handleSearch = () => {
    // 1. cập nhật context của search Params
    updateSearch(localParams);

    // 2. navigate sang /search với query
    const searchParams = new URLSearchParams();
    Object.entries(localParams).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-white rounded-xl shadow-kms-search p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <Select
          value={localParams.technology}
          onValueChange={(value) => setLocalParams((prev) => ({ ...prev, technology: value }))}
        >
          <SelectTrigger className="border-gray-200">
            <SelectValue placeholder="All Technology" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Technology">All Technology</SelectItem>
            {!loading &&
              technologies.map((tech) => (
                <SelectItem key={tech.id} value={tech.name}>
                  {tech.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select
          value={localParams.level}
          onValueChange={(value) => setLocalParams((prev) => ({ ...prev, level: value }))}
        >
          <SelectTrigger className="border-gray-200">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Level">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex space-x-2">
          <Input
            placeholder="Type keywords..."
            value={localParams.keywords}
            onChange={(e) => setLocalParams((prev) => ({ ...prev, keywords: e.target.value }))}
            onKeyPress={handleKeyPress}
            className="flex-1 border-gray-200"
          />
          <Button
            onClick={handleSearch}
            className="bg-kms-button hover:opacity-90 transition-all duration-300 px-6"
          >
            <Search className="h-4 w-4 mr-2" />
            SEARCH
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
