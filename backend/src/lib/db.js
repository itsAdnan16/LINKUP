import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`✅ MongoDB connected ${conn.connection.host}`);
    }catch(error){
        console.error("❌ MongoDB connection failed!");
        console.error("🚨 Error details:", error.message);
        // Optionally, exit the app if DB is critical
        process.exit(1); 
    }
}

export default connectDB;