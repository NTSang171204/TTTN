export interface Knowledge {
    id: number;
    title: string;
    content: string;
    technology: string;       // thay category
    level: string;            // thêm level
    status: "Pending" | "Approved" | "Rejected" | null; // status có thể null
    created_at: string;
    view_count: number;
    author: string;
  }
  