import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors());

app.get('/',(req,res)=>{
    res.json({
        status : "ok",
        message : "Server is healthy"
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})