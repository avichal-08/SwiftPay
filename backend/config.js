const mongoose=require("mongoose");
require('dotenv').config();

const connectDB=async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected ")
    }catch(error){
        console.error("MongoDB connection error ", err)
    }
}

module.exports={
    connectDB
}


