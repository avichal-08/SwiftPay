const express =require("express");
const cors=require("cors");
const mainrouter=require("./routes/index");
const app=express();
app.use(cors({
  origin: 'https://swiftpay-ten.vercel.app/',
  credentials: true
}));
app.use(express.json());
app.use("/api/v1",mainrouter);

app.listen(3000, () => {
  console.log("Server is working on port 3000");
});