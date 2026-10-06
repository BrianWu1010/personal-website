export type Link = { label: string; href: string };

export type Project = {
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links: Link[];
  year: string;
};

export type Experience = {
  role: string;
  org?: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
  stack?: string[];
  kind: "work" | "education";
};

export const profile = {
  name: "Boyuan (Brian) Wu",
  handle: "BrianWu1010",
  title: "Machine Learning & Software Engineer",
  location: "Toronto, ON",
  tagline:
    "I build ML systems end to end: from data pipelines and model training to retrieval-augmented apps running in the cloud.",
  email: "brianwu1010@gmail.com",
  github: "https://github.com/BrianWu1010",
  linkedin: "https://www.linkedin.com/in/boyuanwu01",
  resumePdf: "/resume.pdf",
  resumePage: "/resume",
  focus: ["Applied ML", "RAG / LLM apps", "Computer Vision", "MLOps"],
};

export const projects: Project[] = [
  {
    title: "Made with Nestlé AI Assistant",
    summary:
      "An AI knowledge assistant that answers questions from scraped Made with Nestlé content instead of a static LLM knowledge cutoff.",
    highlights: [
      "Retrieval-augmented generation over indexed site pages with answers cited back to sources",
      "GraphRAG layer modelling relationships between products, recipes and ingredients",
      "Scraping pipeline that refreshes the knowledge base so answers stay current",
      "Containerised backend deployed on Azure with a React chat UI",
    ],
    stack: ["Python", "Azure OpenAI", "Azure AI Search", "RAG", "GraphRAG", "React", "Docker"],
    links: [{ label: "Code", href: "https://github.com/BrianWu1010/nestle-chatbot" }],
    year: "2025",
  },
  {
    title: "Most-Replayed Highlight Extraction",
    summary:
      "Predicts the most-replayed moments of YouTube videos and auto-crops them into vertical 9:16 short-form clips.",
    highlights: [
      "Built a YouTube data pipeline: URL harvesting, subtitle filtering, metadata and replay-heatmap extraction",
      "Trained a temporal conv + self-attention saliency head on Moment-DETR video features",
      "Scene detection and saliency-driven bounding boxes for automatic vertical reframing",
    ],
    stack: ["PyTorch", "Moment-DETR", "OpenCV", "YouTube API", "Pandas"],
    links: [
      { label: "Model", href: "https://github.com/nesquiq/mie1517_final_report" },
      { label: "Data pipeline", href: "https://github.com/JefferyLiu6/mie1517_project" },
    ],
    year: "2025",
  },
  {
    title: "InstaLily Toronto '26 — System Modelling",
    summary:
      "Hackathon entry forecasting ten simulated systems, from power grids and reservoirs to ad auctions and epidemics.",
    highlights: [
      "Built a separate model for each of 10 black-box simulators (stock-flow, ARX, grey-box queueing, etc.)",
      "Mean public score of 0.7545, with a best of 0.88 on ad auctions",
      "Versioned experiment archives and a validation tool for reproducible submissions",
    ],
    stack: ["Python", "NumPy", "Time Series", "Simulation"],
    links: [],
    year: "2026",
  },
];

export const experience: Experience[] = [
  {
    role: "Large-Scale Recommender Systems",
    org: "Tencent (TAAC)",
    start: "Mar 2026",
    end: "May 2026",
    bullets: [
      "Engineered an end-to-end pCVR prediction pipeline, optimizing high-dimensional feature cross-networks over multi-field user behavior sequences",
      "Top score of 0.843133, ranking 489th globally (top 5%) among thousands of international engineering and research teams",
    ],
    stack: ["pCVR Prediction", "Feature Crosses", "Sequence Modeling"],
    kind: "work",
  },
  {
    role: "Reinforcement Learning Research",
    start: "Sep 2024",
    end: "Nov 2025",
    bullets: [
      "MAESTRO: dual-loop multi-agent framework bridging LLM-generated reward shaping with MADDPG backbones, cutting delay 28% on traffic benchmarks",
      "S3RL: Soft Actor-Critic framework with Lagrangian constraints and dual Q-networks for safety-critical robot navigation",
    ],
    stack: ["PyTorch", "MADDPG", "SAC", "Multi-Agent RL", "Safe RL"],
    kind: "work",
  },
  {
    role: "AI Chatbot & Knowledge Graph Engineer",
    org: "Nestlé Canada",
    start: "Jan 2025",
    end: "May 2025",
    bullets: [
      "Integrated Neo4j with Azure OpenAI in a GraphRAG architecture, improving contextual grounding and reducing hallucinations versus vector-only RAG",
      "Built real-time scraping workflows turning unstructured site content (tables, text, images) into machine-readable data for automated vector indexing",
      "Deployed containerized, auto-scaling apps to Azure with an admin interface for editing knowledge-graph entities and relations",
    ],
    stack: ["GraphRAG", "Neo4j", "Azure OpenAI", "Docker", "Web Scraping"],
    kind: "work",
  },
  {
    role: "LLM Product Intelligence & Search Grounding",
    org: "Nestlé Professional",
    start: "Jan 2025",
    end: "May 2025",
    bullets: [
      "Built a modular RAG pipeline with GPT-4o and Bing Grounding, bringing real-time web search into product recommendations for factual answers",
      "Developed a rank-audit framework measuring hallucination and ranking consistency across 100+ categories with temperature-based ablations",
      "Converted unstructured LLM output into schema-validated JSON/CSV datasets for traceable downstream analytics",
    ],
    stack: ["GPT-4o", "Bing Grounding", "RAG", "Python"],
    kind: "work",
  },
  {
    role: "Master of Engineering, Mechanical & Industrial Engineering",
    org: "University of Toronto",
    location: "Toronto, ON",
    start: "Sep 2024",
    end: "Jan 2026",
    bullets: ["GPA 3.7 / 4.0"],
    kind: "education",
  },
  {
    role: "Visiting Undergraduate Research Program (Machine Learning)",
    org: "University of Ottawa",
    location: "Ottawa, ON",
    start: "Sep 2023",
    end: "Apr 2024",
    bullets: [],
    kind: "education",
  },
  {
    role: "Bachelor of Engineering",
    org: "China University of Petroleum-Beijing",
    location: "Beijing, China",
    start: "Sep 2020",
    end: "Jun 2023",
    bullets: ["GPA 3.7 / 4.0"],
    kind: "education",
  },
];
