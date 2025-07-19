const express=require("express");
const router=express.Router();
const { Users,Accounts } = require("../db");
const {signupBody,loginBody,updateBody}=require("../types")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const {authMiddleware}=require("../middleware/auth")

router.put("/",authMiddleware, async (req,res)=>{
    const success=updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"error while updating"
        })
    }

    await Users.updateOne({_id:req.userId},req.body);
    res.status(200).json({
        message:"updated successfully"
    })
})

router.get("/info",authMiddleware,async (req,res)=>{
    const user=await Users.findOne({
        _id:req.userId
    })
    if(!user){
        res.status(411).json({
            message:"user not found"
        })
    }
    res.status(200).json({
        name:user.fname,
        username:user.username
    })
    return;
})

router.post("/signup",async (req,res)=>{
    const success=signupBody.safeParse(req.body)
    if(!success){
        res.json({
            message:"wrong input"
        })
        return
    }
    const existingUser=await Users.findOne({
        username:req.body.username
    })

    if(existingUser){
        res.json({
            message:"username already taken"
        })
        return
    }

    const user=await Users.create({
        fname:req.body.fname,
        lname:req.body.lname,
        username:req.body.username,
        password:req.body.password
    })

    const userId = user._id;

    await Accounts.create({
        user:userId,
        balance:10000
    })


    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        isSignup: true,
        token: token
    })
    return
})

router.post("/login",async (req,res)=>{
    const success=loginBody.safeParse(req.body)
    if(!success){
        res.json({
            message:"error while logging in"
        })
        return
    }

    const user=await Users.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(!user){
        res.json({
            message:"wrong inputs"
        })
        return
    }

    const token=jwt.sign({
        userId:user._id
    },JWT_SECRET)

    res.status(200).json({
        token:token,
        isLogin:true
    })
    return;
})

module.exports=router;