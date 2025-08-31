// src/data/AppAllContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// Định nghĩa type cho technology
interface Technology {
  id: number;
  name: string;
  question_count?: number;
}

// Định nghĩa type cho context
interface AppAllContextType {
  technologies: Technology[];
  loading: boolean;
  technologiesWithStats?: Technology[];
}

// Tạo context
const AppAllContext = createContext<AppAllContextType | undefined>(undefined);

// Provider
export const AppAllProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [technologiesWithStats, setTechnologiesWithStats] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/technology");
        setTechnologies(res.data);
      } catch (err) {
        console.error("Error fetching technologies:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTechnologiesStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/technology/stats");
        setTechnologiesWithStats(res.data);
      } catch (err) {
        console.error("Error fetching technology stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologiesStats();
    fetchTechnologies();
  }, []);

  return (
    <AppAllContext.Provider value={{ technologies, loading, technologiesWithStats }}>
      {children}
    </AppAllContext.Provider>
  );
};




// Hook để dùng context dễ dàng
export const useAppAll = () => {
  const context = useContext(AppAllContext);
  if (!context) {
    throw new Error("useAppAll must be used within AppAllProvider");
  }
  return context;
};
