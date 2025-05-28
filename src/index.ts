import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
const PORT=process.env.PORT||4000;
const app=express();

app.get("/",(req,res)=>{
    res.end("Hello world")
})

app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`);
})
