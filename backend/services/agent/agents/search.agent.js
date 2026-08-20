import { searchTool } from "../config/tavily.js"


export const searchAgent = async (state) => {
    try {
        const results = await searchTool.invoke({
            query:state.prompt
        })

        const smartTrimmedData = results.results
            .slice(0, 3) 
            .map(res => `Title: ${res.title}\nURL: ${res.url}\nInfo: ${res.content}`)
            .join("\n\n");

        return {
            ...state,
            searchResults: smartTrimmedData, 
            images: results.images
        }
    } catch (error) {
        return {
            ...state,
            searchResults:[],
            images:[]
        }
    }
}