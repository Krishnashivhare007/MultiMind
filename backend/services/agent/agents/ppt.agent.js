import { getModel } from "../config/llmModels.js"
import { generatePPT } from "../utils/generatePpt.js"
import { getFromS3 } from "../utils/getFromS3.js"
import { uploadToS3 } from "../utils/uploadTOS3.js"

export const pptAgent = async (state) => {
    try {
        const llm = await getModel("ppt")
        const prompt = `
        You are a professional presentation designer.

        Return ONLY valid JSON.

        format:

        {
        "title":"",
        "subtitle":"",
        "slides":[
        {
        "title":"",
        "points":[
        "",
        "",
        "",
        ""
        ]
        }
        ]
        }

        Rules:

        - Generate exactly 6 content slides.
        - Each slide should have 4-6 concise bullet points.
        - No markdown.
        - No explanation.
        - No code block.
        - Return ONLY JSON.

        Topic:

        ${state.prompt}
        `

        const res = await llm.invoke(prompt)
        
        const data = JSON.parse(res.content)

        const ppt =await generatePPT(data)

        const buffer = await ppt.write({
            outputType:"nodebuffer"
        })
        console.log("ye rha buffer: ",buffer);
        

        const fileName = `ppt-${Date.now()}.pptx`

        await uploadToS3(fileName,buffer,"application/vnd.openxmlformats-officedocument.presentationml.presentation")

        const downloadUrl =await getFromS3(fileName,24*60)

        return {
            ...state,
            aiResponse:`#PPT Generated
            
**${data.title}**

⬇️ [Download PPT](${downloadUrl})

⏳ Link expires in 24 hours
            `
        }

        
    } catch (error) {
        console.log(error);
        return {
             ...state,
             aiResponse:`
             ❌ Failed to generate PPT
             `
         }
    }
}