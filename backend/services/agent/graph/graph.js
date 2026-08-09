import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent";
import { searchAgent } from "../agents/search.agent";
import { codingAgent } from "../agents/coding.agent";
import { pdfAgent } from "../agents/pdf.agent";
import { pptAgent } from "../agents/ppt.agent";
import { imageGenAgent } from "../agents/vision.agent.js";

const workflow = new StateGraph(agentState)

workflow.addNode("router",router)
workflow.addNode("chat",chatAgent)
workflow.addNode("search",searchAgent)
workflow.addNode("coding",codingAgent)
workflow.addNode("pdf",pdfAgent)
workflow.addNode("ppt",pptAgent)
workflow.addNode("vision",imageGenAgent)


workflow.addEdge("__start__","router")
workflow.addConditionalEdges("router",(state)=>{
    switch (state.agent) {// sirf ek baar execute hota hai aur edges register ho jaati hain fir Bas route select hota hai, nayi edge create nahi hoti next time for same returned agent.
        case "chat":
            return "chat";
        case "search":
            return "search";
        case "coding":
            return "coding";
        case "pdf":
            return "pdf";
        case "ppt":
            return "ppt";
        case "vision":
            return "vision";
        default:
            return "chat";
    }
},{//ye path de rhe(mapping) - "chat" return hua  -> "chat" node par jao,"search" return hua -> "search" node par jao
        chat: "chat",
        search: "search",
        coding: "coding",
        pdf: "pdf",
        ppt: "ppt",
        vision: "vision"
})

workflow.addEdge("search","chat")

workflow.addEdge("chat","__end__")
workflow.addEdge("coding","__end__")
workflow.addEdge("pdf","__end__")
workflow.addEdge("ppt","__end__")
workflow.addEdge("vision","__end__")

export const graph = workflow.compile()