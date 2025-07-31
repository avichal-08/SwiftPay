const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    fname:{type:String,required:true,trim:true},
    lname:{type:String,required:true,trim:true},
    username:{ type:String, unique:true , required:true,trim:true,minLength:4},
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