export interface Question {
  id: string;
  title: string;
  content: string;
  technology: string;
  client: string;
  level: string;
  isPopular: boolean;
  votes: { up: number; down: number };
  comments: Comment[];
  tags: string[];
}

export interface Knowledge {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  technology: string;
  level: string;
  likes_count: number;
  dislikes_count: number;
  author_id: number;
  created_at: string;

  comments?: {
    id: number;
    content: string;
    user_id: number;
    parent_id: number | null;
    created_at: string;
    username: string;
  }[];

}
export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Technology {
  id: string;
  name: string;
  icon: string;
  questionCount: number;
  isPopular: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  technologies: string[];
  questionCount: number;
}

export const mockTechnologies: Technology[] = [
  {
    id: "java",
    name: "Java",
    icon: "☕",
    questionCount: 245,
    isPopular: true
  },
  {
    id: "ux-design",
    name: "UX Design", 
    icon: "🎨",
    questionCount: 189,
    isPopular: true
  },
  {
    id: "ui-developer",
    name: "UI Developer",
    icon: "💻",
    questionCount: 156,
    isPopular: true
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    questionCount: 203,
    isPopular: false
  },
  {
    id: "dotnet",
    name: ".NET",
    icon: "⚡",
    questionCount: 134,
    isPopular: false
  },
  {
    id: "qa-tester",
    name: "QA Tester",
    icon: "🔍",
    questionCount: 98,
    isPopular: false
  }
];

export const mockClients: Client[] = [
  {
    id: "verizon",
    name: "Verizon",
    logo: "✓",
    technologies: ["Java", "UX Designer", "UI developer", "QA Tester"],
    questionCount: 87
  },
  {
    id: "walmart",
    name: "Walmart", 
    logo: "⭐",
    technologies: ["Java with micro services", "QA Tester", ".net developers"],
    questionCount: 92
  },
  {
    id: "tmobile",
    name: "T-Mobile",
    logo: "T",
    technologies: ["Java with springboot", "UX Designer", "UI developer"],
    questionCount: 76
  }
];

export const mockQuestions: Question[] = [
  {
    id: "java-001",
    title: "What is Java?",
    content: "Java is the high-level, object-oriented, robust, secure programming language, platform-independent, high performance, Multithreaded, and portable programming language. It was developed by James Gosling in June 1991. It can also be known as the platform as it provides its own JRE and API.",
    technology: "Java",
    client: "Verizon", 
    level: "Beginner",
    isPopular: true,
    votes: { up: 121, down: 22 },
    comments: [
      {
        id: "c1",
        author: "John Developer",
        content: "Great explanation! This helped me understand the core concepts of Java.",
        timestamp: "2 hours ago",
        likes: 15
      }
    ],
    tags: ["programming", "basics", "platform-independent"]
  },
  {
    id: "java-002", 
    title: "Why is Java a platform independent language?",
    content: "Java is platform-independent because it uses bytecode which can run on any system that has a Java Virtual Machine (JVM) installed, regardless of the underlying operating system.",
    technology: "Java",
    client: "Walmart",
    level: "Intermediate", 
    isPopular: true,
    votes: { up: 89, down: 12 },
    comments: [],
    tags: ["jvm", "bytecode", "cross-platform"]
  },
  {
    id: "java-003",
    title: "How do you respond to negative feedback?",
    content: "When receiving negative feedback, it's important to listen actively, remain calm, ask clarifying questions, and focus on understanding the underlying concerns to improve future performance.",
    technology: "Java",
    client: "T-Mobile",
    level: "Advanced",
    isPopular: false,
    votes: { up: 67, down: 8 },
    comments: [],
    tags: ["soft-skills", "communication", "improvement"]
  },
  {
    id: "ux-001",
    title: "What is the difference between UX and UI?",
    content: "UX (User Experience) focuses on the overall experience and journey of users, while UI (User Interface) focuses on the visual and interactive elements that users directly interact with.",
    technology: "UX Design",
    client: "Verizon",
    level: "Beginner",
    isPopular: true,
    votes: { up: 156, down: 18 },
    comments: [],
    tags: ["design", "user-experience", "interface"]
  },
  {
    id: "ui-001",
    title: "What are the limitations when serving XHTML pages?",
    content: "XHTML pages have stricter syntax requirements, limited browser compatibility for certain features, and can be more verbose than HTML5. They also require proper XML declaration and namespace definitions.",
    technology: "UI Developer",
    client: "T-Mobile", 
    level: "Intermediate",
    isPopular: false,
    votes: { up: 43, down: 7 },
    comments: [],
    tags: ["xhtml", "web-standards", "compatibility"]
  }
];

export const recentSearches = ["Java", "UX Designer", "Python", "PHP", ".NET", "UI Development", "QA Tester"];

export const popularQuestions = [
  "What is Java?",
  "Why is Java a platform independent language?", 
  "How do you respond to negative feedback?",
  "Tell me about your most/least successful UX design project.",
  "What is web accessibility?"
];