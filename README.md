<h1 align="center">🤖 MultiMind - Production-Ready Multi-Agent AI Platform</h1>

<p align="center">
  A scalable, microservices-based AI platform featuring multiple specialized agents (Coding, PDF RAG, PPT Generation, Vision, Web Search) built with the MERN stack, LangGraph, and deployed on AWS.
</p>

> **Note on Deployment**: This project was fully architected and deployed on AWS (ECS, ALB, ElastiCache, S3). To prevent high AWS billing costs, the cloud infrastructure is currently spun down. The CI/CD workflows are preserved in `.github/workflows` for reference, but the AWS deployment steps will purposefully fail.

## ✨ Key Features

*   **🧠 Multi-Agent System (LangGraph & LangChain)**: Intelligent routing between specialized AI agents based on user intent.
    *   **Chat Agent**: General conversational AI using Groq/Gemini.
    *   **Coding Agent**: Generates code, previews UI (HTML/CSS/JS), and provides explanations using DeepSeek.
    *   **Web Search Agent**: Fetches real-time internet data and images using Tavily.
    *   **PDF RAG Agent**: Upload a PDF, chunk it, generate embeddings, store in Qdrant Vector DB, and chat with your document.
    *   **PPT Agent**: Automatically generates structured PowerPoint presentations (.pptx) based on prompts.
    *   **Vision/Image Agent**: Analyzes uploaded images or generates new images based on text prompts.
*   **🏗️ Microservices Architecture**: Scalable backend divided into independent services (Gateway, Auth, Chat, Agent, Billing) communicating via HTTP and Redis.
*   **💳 Subscription & Billing**: Razorpay integration for purchasing AI credits (Free, Starter, Pro tiers).
*   **🔒 Authentication**: Secure Google Login powered by Firebase Authentication.
*   **☁️ Cloud Native & CI/CD**: Fully Dockerized services with automated GitHub Actions pipelines deploying to AWS Elastic Container Service (ECS).

## 🛠️ Tech Stack

**Frontend:**
*   React.js (Vite) & Tailwind CSS
*   Redux Toolkit (State Management)
*   Firebase (Google Auth)
*   React Markdown & Monaco Editor (Code formatting & editing)

**Backend (Microservices):**
*   Node.js & Express.js
*   MongoDB (Atlas) & Mongoose
*   Redis (Caching, Session Management, Rate Limiting)
*   LangChain & LangGraph (AI Agent Orchestration)
*   Qdrant (Vector Database for RAG)
*   Multer & PDF-Parse (File handling)

**DevOps & Cloud (AWS):**
*   Docker & Docker Compose
*   AWS ECS (Fargate) & ECR (Container hosting)
*   AWS ALB (Application Load Balancer)
*   AWS S3 (File Storage for PDFs/Images) & CloudFront (CDN)
*   GitHub Actions (CI/CD)

## 📂 Folder Structure

```text
MultiMind/
├── .github/workflows/      # CI/CD deployment pipelines
├── frontend/               # React Vite frontend application
└── backend/                # Microservices architecture
    ├── gateway/            # API Gateway (Port 8000) routes traffic to services
    ├── shared/             # Shared utilities (e.g., Redis client)
    └── services/
        ├── auth/           # Authentication & Session Management (Port 8001)
        ├── chat/           # Conversation & Message History (Port 8002)
        ├── agent/          # AI Agents, LangGraph, RAG processing (Port 8003)
        └── billing/        # Razorpay integration & Credit Management (Port 8004)
```

## 🚀 Getting Started (Local Development)

### Prerequisites
*   Node.js (v18+)
*   Docker & Docker Compose (for local Redis)
*   MongoDB Atlas Account
*   Firebase Project (Web Setup)
*   Razorpay Test Account
*   API Keys: Groq, Gemini, DeepSeek (OpenRouter), Tavily, Qdrant

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/MultiMind.git](https://github.com/yourusername/MultiMind.git)
cd MultiMind
```

### 2. Start Local Redis
Ensure Docker is running, then start the Redis container:
```bash
cd backend
docker-compose up -d
```

### 3. Setup Environment Variables
Create `.env` files in the `frontend` and each backend service (`gateway`, `auth`, `chat`, `agent`, `billing`). Reference `.env.example` (if provided) or add the necessary API keys (Mongo URI, Redis URL, AI keys, AWS keys, etc.).

### 4. Install Dependencies & Run Backend Services
Open multiple terminals to start the Gateway and all Microservices.
```bash
# Terminal 1: Gateway
cd backend/gateway && npm install && npm run dev

# Terminal 2: Auth Service
cd backend/services/auth && npm install && npm run dev

# Terminal 3: Chat Service
cd backend/services/chat && npm install && npm run dev

# Terminal 4: Agent Service
cd backend/services/agent && npm install && npm run dev

# Terminal 5: Billing Service
cd backend/services/billing && npm install && npm run dev
```

### 5. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173` in your browser.

## 🚢 Deployment Architecture

This project was built to be production-ready and includes a full CI/CD pipeline:
1.  **Code Push**: Triggering GitHub Actions on pushes to the `main` branch.
2.  **Dockerization**: Building individual Docker images for the Gateway and each microservice.
3.  **AWS ECR**: Pushing the built images to Amazon Elastic Container Registry.
4.  **AWS ECS**: Forcing a new deployment on Elastic Container Service to run the updated containers.
5.  **Load Balancing**: An Application Load Balancer (ALB) securely routes traffic from the frontend to the internal ECS services using Cloud Map for service discovery.
6.  **Static Hosting**: The React frontend is built and synced to an AWS S3 bucket, served globally via CloudFront.
