const express=require("express");
const router=express.Router();
const { Accounts,Users } = require("../db");
const {authMiddleware}=require("../middleware/auth");

router.get("/balance",authMiddleware,async (req,res)=>{

    const account=await Accounts.findOne({
        user:req.userId
    })
   
    res.json({
        balance:account.balance
    })
})

router.post("/transfer",authMiddleware,async (req,res)=>{
    const sender=await Accounts.findOne({
        user:req.userId
    })

    if(!sender){
        res.status(401).json({
            message:"sender not found"
        })
        return
    }
    if(sender.balance<req.body.amount){
        res.status(400).json({
            message:"insufficient balance"
        })
        return
    }
    else{
        const newbalance=sender.balance-req.body.amount
        await Accounts.updateOne({
            user:req.userId
        },{
            balance:newbalance
        })
    }

    const reciever=await Users.findOne({
        username:req.body.toUsername
    })

    const recieverId=reciever._id
    const recvaccount=await Accounts.findOne({
        user:recieverId
    })

    if(!recvaccount){
        res.status(400).json({
            message:"receiver account not found"
        })
        return
    }

    try{
    const newbalance=Number(recvaccount.balance)+Number(req.body.amount)
    await Accounts.updateOne({
        user:recieverId
    },{
        balance:newbalance
    })
    }
    catch(err){
        console.log(err)
    }

    res.status(200).json({
        message:"transaction successful"
    })

    return
})

module.exports=router;