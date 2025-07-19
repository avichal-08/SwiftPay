const express=require("express")
const router=express.Router()
const {authMiddleware}=require("../middleware/auth")

router.get("/",authMiddleware,async(req,res)=>{
    res.json({
        allowed:true
    })
})

module.exports=router;