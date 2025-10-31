import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors());

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)

    if (conn){
        console.log('\n 📈 MongoDB Connected ')
    } 
    } catch (error) {
        console.log(`\n ❌ MongoDB connection: ${error.message}` )
    }
   
}

app.get('/',(req,res)=>{
    res.json({
        status : "ok",
        message : "Server is healthy"
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(` \n 🛜  server is running on port ${PORT}`);
    connectDB();
})