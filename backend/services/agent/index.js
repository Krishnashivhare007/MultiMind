import express from 'express'
import 'dotenv/config'
import connectDb from './config/db.js'
import router from './routes/agent.route.js'



const port = process.env.PORT

const app = express()


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/",router)

app.get('/',(req,res)=>{
    res.json({message:'hello from agent'})
})

app.listen(port,()=>{
    console.log(`agent started at port: ${port}`);
    connectDb()
})

