import mongoose from "mongoose";
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected");
        
    } catch (error) {
            console.error("❌ DB Connection Error:", error.message);
        
    }
}

export default connectdb