import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppAll } from "@/data/AppAllContext";
import { searchKnowledges } from "@/services/api";
interface SearchBarProps {
  onSearch?: (params: SearchParams) => void;
}

export interface SearchParams {
  technology: string;
  level: string;
  keywords: string;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const navigate = useNavigate();
  const { technologies, loading } = useAppAll();
  
  const [searchParams, setSearchParams] = useState<SearchParams>({
    technology: "All Technology", 
    level: "Level",
    keywords: ""
  });




  const handleSearch = async () => {
    try {
    const data = await searchKnowledges(searchParams);
    if (onSearch) {
      onSearch(searchParams); // bạn vẫn giữ onSearch callback nếu cần
    } else {
      console.log("Search result:", data); // hoặc navigate sang trang kết quả
      // navigate("/search-results", { state: { data } });
    }
  } catch (err) {
    console.error("Search failed:", err);
  }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-kms-search p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <Select
          value={searchParams.technology} 
          onValueChange={(value) => setSearchParams(prev => ({ ...prev, technology: value }))}
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
          value={searchParams.level} 
          onValueChange={(value) => setSearchParams(prev => ({ ...prev, level: value }))}
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
            value={searchParams.keywords}
            onChange={(e) => setSearchParams(prev => ({ ...prev, keywords: e.target.value }))}
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