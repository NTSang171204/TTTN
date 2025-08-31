import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ==================== TYPE ====================
interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AdminContextType {
  totalTechs: number;
  totalKnowledges: number;
  totalUsers: number;
  loading: boolean;

  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// ==================== CONTEXT ====================
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ==================== PROVIDER ====================
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalTechs, setTotalTechs] = useState<number>(0);
  const [totalKnowledges, setTotalKnowledges] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const isAuthenticated = !!token;

  // Fetch tổng dữ liệu dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [techRes, knowledgeRes, userRes] = await Promise.all([
          axios.get("http://localhost:3000/api/technology"),
          axios.get("http://localhost:3000/api/knowledge"),
          axios.get("http://localhost:3000/api/auth/users"),
        ]);

        setTotalTechs(Array.isArray(techRes.data) ? techRes.data.length : 0);
        setTotalKnowledges(Array.isArray(knowledgeRes.data) ? knowledgeRes.data.length : 0);
        setTotalUsers(Array.isArray(userRes.data) ? userRes.data.length : 0);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  // ==================== LOGIN ====================
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        const { token, admin } = res.data;
        setToken(token);
        setAdmin(admin);
        localStorage.setItem("token", token);
        localStorage.setItem("admin", JSON.stringify(admin));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/admin/register", {
        username,
        email,
        password,
      });
      return res.status === 201; // nếu API trả 201 là thành công
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }};


  // ==================== LOGOUT ====================
  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  // ==================== LOAD LOCAL STORAGE ====================
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        totalTechs,
        totalKnowledges,
        totalUsers,
        loading,
        admin,
        token,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// ==================== HOOK ====================
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
