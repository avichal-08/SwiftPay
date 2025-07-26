const express=require("express");
const router =express.Router()
const userRouter=require("./user");
const accountRouter=require("./account");
const bulkRouter=require("./bulk");
const meRouter=require("./me");
const pingRouter=require("./ping");
router.use("/user",userRouter)
router.use("/account",accountRouter)
router.use("/bulk",bulkRouter)
router.use("/me",meRouter)
router.use("/ping",pingRouter)

module.exports=router;