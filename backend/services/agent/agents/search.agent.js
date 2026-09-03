import { checkAgentLimit } from "../config/agentlimit.js";
import { searchTool } from "../config/tavily.js"
import { deductCredits } from "../utils/deductCredits.js";


export const searchAgent = async (state) => {


    try {
        await checkAgentLimit(state.userId,"search")
        
        const results = await searchTool.invoke({
            query:state.prompt
        })

        const smartTrimmedData = results.results
            .slice(0, 3) 
            .map(res => `Title: ${res.title}\nURL: ${res.url}\nInfo: ${res.content}`)
            .join("\n\n");

            await deductCredits(state.userId,"search")

        return {
            ...state,
            searchResults: smartTrimmedData, 
            images: results.images
        }
    } catch (error) {

        if(error.status==429){
            return {
             ...state,
             aiResponse:
             error?.data?.message,
             searchResults:[],
            images:[]
         }
        }

        return {
            ...state,
            aiResponse:`Failed to Search`,
            searchResults:[],
            images:[]
        }
    }
}