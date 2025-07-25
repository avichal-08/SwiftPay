const express =require("express");
const cors=require("cors");
const mainrouter=require("./routes/index");
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
  res.json({
    message:"hello"
  })
})
app.use("/api/v1",mainrouter);

app.listen(3000, () => {
  console.log("Server is working on port 3000");
});