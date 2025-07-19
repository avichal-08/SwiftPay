import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
export default function Dashboard(){
    const [fname,setFname]=useState("")
    const [uname,setUname]=useState("")
    const [balance,setBalance]=useState(0)
    const [users,setUsers]=useState([])
    const token=localStorage.getItem("token")
    const navigate=useNavigate()
    useEffect(()=>{
       if(!token){
        navigate("/login")
       }
       else{
       const namefn= async ()=>{
        const userres=await axios.get("http://localhost:3000/api/v1/user/info",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setFname(userres.data.name)
        setUname(userres.data.username)
    };
        namefn()
        const balancefn=async()=>{
        const balanceres=await axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setBalance(balanceres.data.balance)
    };
    balancefn()
    const usersfn=async()=>{
        const usersres=await axios.get("http://localhost:3000/api/v1/bulk/",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setUsers(usersres.data)
    };
    usersfn()
}},[])
  
    return(<div className="bg-black">
        <button className="text-white text-xl rounded-xl mt-2 ml-2 w-25 h-10 bg-orange-700 cursor-pointer hover:bg-orange-600" onClick={()=>{
            localStorage.removeItem("token")
            navigate("/login")
        }}>Log Out</button>
        <div className="h-full w-full pt-8">
  <div className="border border-gray-200 rounded-2xl p-6 mx-20 h-full">
    <div className="flex mx-8 pt-2 rounded-2xl border h-20 border-gray-200">
        <div className="ml-10 mt-4 text-white text-2xl font-medium font-serif cursor-pointer">SwiftPay</div>
        <div className="ml-180 mt-4 text-white text-xl">Hello , {fname} </div>
        <div className="rounded-full ml-10 mt-3 w-10 h-10 bg-gray-500 text-black text-xl flex justify-center pt-1">{fname[0]}</div>
    </div>
    <div className="flex mx-8 my-10 pt-5 px-10 rounded-2xl border h-20 border-gray-200 text-white text-2xl  ">Your Balance: ₹{balance}</div>
    <div className="mx-8 my-10 pt-5 px-10 rounded-2xl border  border-gray-200 text-white text-2xl">
        <div className="mb-8">Users</div>
        {users.map(function(user){
            if(!(user.username===uname)){
            return <div className=" text-white flex justify-between mb-12">
               <div className="flex"> <div className="rounded-full w-10 h-10 bg-gray-500 flex justify-center pt-[2px] ">{user.fname[0]}</div>
                <div className="ml-3">{user.fname}</div></div>
                <button onClick={()=>navigate("/send?to="+user.fname+"&username="+user.username)} className="bg-orange-700 rounded w-40 pb-1 cursor-pointer hover:bg-orange-600">Send Money</button>
            </div>}
        })}
    </div>
  </div>
</div>
</div>
    )
}