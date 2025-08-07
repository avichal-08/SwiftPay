const express=require("express")
const router=express.Router()

router.get("/",(req,res)=>{
    console.log("Ping server")
    res.json({
        message:"server pinges"
    })
})

module.exports=router;