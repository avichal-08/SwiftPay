require('dotenv').config();
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
 .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));

const userSchema=mongoose.Schema({
    fname:{type:String,required:true,trim:true},
    lname:{type:String,required:true,trim:true},
    username:{ type:String, unique:true , required:true,trim:true,minLength:4,maxLength:10},
    password:{type:String,required:true,minLength:6}
    }, { timestamps: true });
    
const accountSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    balance:{
        type:Number,
        required:true
    }
},{timestamps:true});

const Accounts=mongoose.model('Accounts',accountSchema);
const Users=mongoose.model('Users',userSchema);
module.exports={
    Users,
    Accounts
}