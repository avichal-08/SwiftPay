const express =require("express");
const cors=require("cors");
const mainrouter=require("./routes/index");
const {connectDB}=require("./config")
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/v1",mainrouter);

const startServer=async()=>{
    await connectDB()
    app.listen(3000, () => {
       console.log("Server is working on port 3000");
    })
}

startServer();