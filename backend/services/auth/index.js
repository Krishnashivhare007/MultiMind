import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import router from './routes/auth.route.js'
dotenv.config()

const port = process.env.PORT

const app = express()

app.use(express.json())

app.use("/",router)

app.get('/',(req,res)=>{
    res.json({message:'hello from auth'})
})
// Bhaley hi aapne login function ke andar redis ko use nahi kiya, par file ke top par import hone ki wajah se wo server start hote hi connect ho jata hai(jise Singleton connection bolte hain).
app.listen(port,()=>{
    console.log(`auth started at port: ${port}`);
    connectDb()
})

