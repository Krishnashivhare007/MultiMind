import { checkAgentLimit } from "../config/agentlimit.js"
import { getModel } from "../config/llmModels.js"
import { deductCredits } from "../utils/deductCredits.js"

export const codingAgent = async (state) => {
    try {
        await checkAgentLimit(state.userId, "coding")
        const intentLLm = await getModel("intent")
        const llm = await getModel("coding")

        const intentRes = await intentLLm.invoke(`
            You are an intent classifier,

            Return ONLY one of these values:

            CODE_GENERATION
            CODE_REVIEW,
            CODE_EXPLANATION
            DEBUGGING
            OPTIMIZATION
            CONVERSION
            DOCUMENTATION

            user Request:
            ${state.prompt}
            `)

        const intent = intentRes.content.trim().toUpperCase();
        
        if (intent == "CODE_GENERATION") {
            const prompt = `
            You are MultiMind Coding Agent.

            Generate the requested project.

            Default stack:
            - HTML
            - CSS 
            - JavaScript

            Use React / Next.js / Vue ONLY if explicitly requested.

            Rules:

            - Responsive
            - Modern UI
            - CSS Variables
            - Flexbox/Grid
            - Smooth Scroll
            - Hover Effects
            - Beautiful spacing
            - Single page unless user asks otherwise.

            IMAGES
            ======================

            Always use real Unsplash images.

            Never use placeholders.

            Return ONLY valid JSON.

            Schema:

            {
            "files":[
            {
                "name":"index.html",
                "content":"..."
            },
            {
                "name":"style.css",
                "content":"..."
            },
            {
                "name":"script.js",
                "content":"..."
            }
            ]
            }

            Rules:

            - Output must start with {
            - Output must end with }
            - No markdown
            - No explanation
            - No extra text
            - No \`\`\`
            - Never mention intent
            - Keep code concise and minimal. Do not generate overly massive HTML/CSS.

            User Request: 
            ${state.prompt}
            `

            const res = await llm.invoke(prompt)

            let cleanContent = res.content
                .replace(/```json/gi, "") 
                .replace(/```/g, "")      
                .trim();                  

            let data = {};

            try {
                data = JSON.parse(cleanContent);
            } catch (error) {
                console.error("JSON Parse Error! LLM ne ye bheja tha:", res.content);
                data = { files: [] }; 
            }

            await deductCredits(state.userId, "coding")

            return {
                ...state,
                aiResponse: "Code Generated Successfully.",
                artifacts: [
                    {
                        title: state.prompt,
                        id: Date.now(),
                        type: "Project",
                        files: data.files || []
                    }
                ]
            }
        }

        const res = await llm.invoke(`
            The user's request is:

            ${intent}

            Return Markdown only.

            Never generate project files.

            Use headings like:

            # Overview 

            ## explanation

            ## Problems

            ## Improvements

            ## Best Practices

            ## Optimized Code (if needed)

            User Request:

            ${state.prompt}
            `)

        const data = res.content

        await deductCredits(state.userId, "coding")

        return {
            ...state,
            aiResponse: data,
            artifacts: []
        }

    } catch (error) {
        console.error("Error in codingAgent:", error);
        
         if(error.status==429){
            return {
             ...state,
             aiResponse:
             error?.data?.message,
             artifacts: []
         }
        }
        
        return {
            ...state,
            aiResponse: "Failed to process coding request. Please try again.",
            artifacts: []
        }
    }
}