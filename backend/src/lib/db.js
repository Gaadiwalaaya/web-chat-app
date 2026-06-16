import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MONGODB connnected : ${conn.connection.host}`);
    }
    catch(error) {
        console.log("MongoDB connection error : ", error)

    }
};