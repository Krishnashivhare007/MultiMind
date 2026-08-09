import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const groq = new ChatGroq({
  model: "llama-3.3-70b-versatile",
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
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