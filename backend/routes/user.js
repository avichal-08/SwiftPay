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

router.post("/signup",async (req,res)=>{
    const success=signupBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"wrong input"
        })
    }
    const existingUser=await Users.findOne({
        username:req.body.username
    })

    if(existingUser){
        res.status(411).json({
            message:"username already taken"
        })
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
        message: "User created successfully",
        token: token
    })
})

router.post("/login",async (req,res)=>{
    const success=loginBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"wrong inputs"
        })
    }

    const user=await Users.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(!user){
        res.status(411).json({
            message:"error while logging in"
        })
    }

    const token=jwt.sign({
        userId:user._id
    },JWT_SECRET)

    res.json({
        token:token
    })
    return;
})

module.exports=router;