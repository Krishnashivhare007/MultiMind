import { getModel } from "../config/llmModels.js"
import { generatePdf } from "../utils/generatePdf.js"
import { getFromS3 } from "../utils/getFromS3.js"
import { uploadToS3 } from "../utils/uploadTOS3.js"

export const pdfAgent = async (state) => {
    try {
        const llm = await getModel("pdf")
        const prompt = `
        You are an expert document writer.

Return ONLY valid JSON.

DO NOT return markdown.

Do NOT return explanations.

Strucuture:

{
"title":"",
"subtitle":"",
"sections":[
{
"heading":"",
"points":[]
}
]
}

Generate 4-8 sections.

Each section should have 3-6 concise bullet points.

Topic:

${state.prompt}
        `

        const res = await llm.invoke(prompt)
        const data=(JSON.parse(res.content))

        const pdfBuffer = await generatePdf(data)

        const fileName = `pdf-${Date.now()}.pdf`
        
        await uploadToS3(fileName,pdfBuffer,"application/pdf")

        const downloadUrl = await getFromS3(fileName,24*60)

        return {
            ...state,
            aiResponse:`#PDF Generated
            
**${data.title}**

⬇️ [Download PDF](${downloadUrl})

⏳ Link expires in 24 hours
            `
        }
        
    } catch (error) {
        console.log(error);
        return {
             ...state,
             aiResponse:`
             ❌ Failed to generate PDF
             `
         }
    }
}