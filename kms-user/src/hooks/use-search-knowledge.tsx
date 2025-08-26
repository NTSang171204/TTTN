import { useState, useEffect } from "react";
import { searchKnowledges } from "@/services/api";
import { Knowledge } from "@/data/mockData";

export const useSearchKnowledge = (params: { technology?: string; level?: string; keywords?: string }) => {
  const [results, setResults] = useState<Knowledge[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await searchKnowledges({
          technology: params.technology === "All Technology" ? "" : params.technology,
          level: params.level === "Level" ? "" : params.level,
          keywords: params.keywords || "",
        });
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [params.technology, params.level, params.keywords]);

  return { results, loading, setResults };
};
