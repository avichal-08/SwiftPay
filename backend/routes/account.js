const express=require("express");
const router=express.Router();
const { Accounts,Users } = require("../db");
const {authMiddleware}=require("../middleware/auth");
const mongoose = require("mongoose");

router.get("/balance",authMiddleware,async (req,res)=>{
    const account=await Accounts.findOne({
        user:req.userId
    })
   
    res.json({
        balance:account.balance
    })
})

router.post("/transfer",authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();
    try{
    session.startTransaction();
    const amount=Number(req.body.amount)
    const toUsername=req.body.toUsername;
    const sender=await Accounts.findOne({
        user:req.userId
    }).session(session)

    if(!sender){
        await session.abortTransaction();
        res.status(200).json({
            message:"sender not found"
        })
        return
    }
    if(sender.balance<amount||amount<=0||isNaN(amount)){
        await session.abortTransaction();
        res.status(200).json({
            message:"insufficient balance"
        })
        return
    }
    else{
        await Accounts.updateOne({
            user:req.userId
        },{
           $inc:{balance:-amount}
        },
        {session})
    }

    const reciever=await Users.findOne({
        username:toUsername
    }).session(session)

    if(!reciever){
        await session.abortTransaction();
        res.status(200).json({
            message:"reciever not found"
        })
        return
    }

    const recieverId=reciever._id
    const recvaccount=await Accounts.findOne({
        user:recieverId
    }).session(session)

    if(!recvaccount){
        await session.abortTransaction();
        res.status(200).json({
            message:"receiver account not found"
        })
        return
    }

    await Accounts.updateOne({
        user:recieverId
    },{
       $inc:{balance:amount}
    },{session})

    await session.commitTransaction()
    res.status(200).json({
        message:"transaction successful"
    })

    return
    }catch(err){
        await session.abortTransaction();
        res.status(400).json({
            message:"error while performing transaction",
            error:err
        })
        return
    }finally {
        session.endSession();
        return
    }

})

module.exports=router;