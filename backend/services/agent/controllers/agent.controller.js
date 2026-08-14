import axios from 'axios'
import { graph } from '../graph/graph.js'
import { addMessage } from '../config/memory.js'

export const agent = async (req,res) => {
    try {
        let {prompt,conversationId} = req.body

        if (!conversationId) {
            // Yahan apne hisaab se DB mein conversation create karne ka function call karo
            const newChat = await axios.post(`${process.env.CHAT_SERVICE}/create-conversation`, {
                // jo bhi data chahiye (user id etc)
            });
            conversationId = newChat.data._id;
        }

        await addMessage({conversationId,role:"user",content:prompt})
        
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:'user',content:prompt
        })

        const result = await graph.invoke({
            prompt,conversationId

        })

        
        const response = result.aiResponse

        await addMessage({conversationId,role:"assistant",content:response})

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:'assistant',content:response
        })


        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({message:`agent error ${error}`})
    }
}

