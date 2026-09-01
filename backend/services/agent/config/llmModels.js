import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatOpenRouter } from "@langchain/openrouter";

const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey:process.env.GROQ_API_KEY,
  maxTokens: 3000,
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-3.6-flash",
});



const openrouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens: 3000,
});


export const getModel = async (agent)=>{
    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return groq;
        case "coding":
            return openrouter;
        case "pdf":
            return groq;
        case "ppt":
            return groq;
        case "vision":
            return groq;
        case "pdfRag":
            return groq;
        case "imageAnalyzer":
            return gemini;
        default:
            return groq;
    }
}