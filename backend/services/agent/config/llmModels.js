import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey:process.env.GROQ_API_KEY
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-3.6-flash",
});


export const getModel = async (agent)=>{
    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return groq;
        case "coding":
            return gemini;
        case "pdf":
            return groq;
        case "ppt":
            return groq;
        case "vision":
            return groq;
        default:
            return groq;
    }
}