const express=require("express");
const router=express.Router();
const {Users} =require("../db");
const {authMiddleware}=require("../middleware/auth")

router.get("/",authMiddleware,async (req,res)=>{
    const users=await Users.find()
    res.json(users)
    return;
})

module.exports=router