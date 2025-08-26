import React, { createContext, useContext, useState } from "react";
import { Knowledge } from "@/data/mockData";
import { useSearchKnowledge } from "@/hooks/use-search-knowledge";

export interface SearchParams {
  technology: string;
  level: string;
  keywords: string;
}

interface SearchContextType {
  searchParams: SearchParams;
  results: Knowledge[];
  loading: boolean;
  updateSearch: (params: SearchParams) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    technology: "All Technology",
    level: "Level",
    keywords: "",
  });

  const { results, loading } = useSearchKnowledge(searchParams);

  const updateSearch = (params: SearchParams) => {
    setSearchParams(params);
  };

  return (
    <SearchContext.Provider value={{ searchParams, results, loading, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearchContext must be used inside SearchProvider");
  return ctx;
};
