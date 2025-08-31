import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createKnowledge, getTechnologies } from "@/services/api";
import { useAppAll } from "@/data/AppAllContext";

const CreateKnowledge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  

  const [formData, setFormData] = useState({
    technology: "",
    level: "",
    title: "",
    content: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const { technologies, loading} = useAppAll();

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.technology || !formData.level || !formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createKnowledge({
        ...formData,
        tags
      });
        
      toast({
        title: "Success!",
        description: "Knowledge article created successfully.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create knowledge.",
        variant: "destructive",
      });
    }

  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-kms-card">
            <CardHeader className="bg-gradient-to-r from-kms-hero to-blue-600 text-blue-500 rounded-t-lg">
              <CardTitle className="text-2xl font-bold ">Create New Knowledge</CardTitle>
              <p className="text-blue-400">Share your expertise with the community</p>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Technology Selection */}
                <div className="space-y-2">
                  <Label htmlFor="technology" className="text-foreground font-medium">
                    Technology 
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("technology", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={loading ? "Loading..." : "Select a technology"} />
                    </SelectTrigger>
                    <SelectContent>
                      {!loading &&
                        technologies.map((tech) => (
                          <SelectItem key={tech.id} value={tech.name}>
                            {tech.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Level Selection */}
                <div className="space-y-2">
                  <Label htmlFor="level" className="text-foreground font-medium">
                    Difficulty Level *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("level", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground font-medium">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter a descriptive title for your knowledge article"
                    className="w-full"
                  />
                </div>

                {/* Content Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-foreground font-medium">
                    Content *
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Write your knowledge article content here. Be detailed and provide examples where possible."
                    className="w-full min-h-[200px] max-h-[400px] resize-y"
                  />
                  <p className="text-sm text-muted-foreground">
                    {formData.content.length} characters
                  </p>
                </div>

                {/* Tags Input */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-foreground font-medium">
                    Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tags (press Enter to add)"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add Tag
                    </Button>
                  </div>
                  
                  {/* Display Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-destructive"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-kms-hero to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-8"
                  >
                    Create Knowledge
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="px-8"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateKnowledge;