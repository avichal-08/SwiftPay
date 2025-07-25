import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
export default function Dashboard(){
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [uname,setUname]=useState("")
    const [balance,setBalance]=useState(0)
    const [users,setUsers]=useState([])
    const apiUrl = import.meta.env.VITE_API_URL
    const token=localStorage.getItem("token")
    const navigate=useNavigate()
    useEffect(()=>{
       if(!token){
        navigate("/login")
       }
       else{
       const namefn= async ()=>{
        const userres=await axios.get(`${apiUrl}/api/v1/user/info`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setFname(userres.data.fname)
        setLname(userres.data.lname)
        setUname(userres.data.username)
    };
        namefn()
        const balancefn=async()=>{
        const balanceres=await axios.get(`${apiUrl}/api/v1/account/balance`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setBalance(balanceres.data.balance)
    };
    balancefn()
    const usersfn=async()=>{
        const usersres=await axios.get(`${apiUrl}/api/v1/bulk/`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setUsers(usersres.data)
    };
    usersfn()
}},[])
  
    return(<div className="bg-white flex">
        <div className="h-screen fixed">
            <div className="flex text-3xl m-3"><div className="text-[#EA6302]">Swift</div><div>Pay</div></div>
        <button className="text-xl text-white rounded-xl mt-128 ml-2 w-35 h-10 bg-orange-700 cursor-pointer hover:bg-orange-600" onClick={()=>{
            localStorage.removeItem("token")
            navigate("/login")
        }}>Log Out</button>
        </div>
        <div className="h-screen ml-45 w-300 mt-18 mr-8">
        <div className="text-[#EA6302] text-4xl border-b-2 border-b-black h-14">Overview</div>
        <div className="bg-[#ff700a4f] rounded-2xl mt-5 h-30 pt-5">
        <div className="flex ">
        <div className="rounded-full ml-5  w-10 h-10 bg-gray-500 text-black text-xl flex justify-center pt-1">{fname[0]}</div>
        <div className="ml-5 mt-1 font-semibold text-xl">{fname} {lname} </div>
        </div>
        <div className="ml-[77px] font-semibold text-xl mt-3 ">Your Balance: ₹{balance}</div>
        </div>
        <div className="text-[#EA6302] text-4xl border-b-2 border-b-black mt-5 h-14">Users</div>
    <div className="bg-[#ff700a4f] mt-6 pt-5 px-5 rounded-2xl border  border-gray-200 text-white text-2xl">
        {users.map(function(user){
            if(!(user.username===uname)){
            return <div className=" text-white flex justify-between mb-8">
               <div className="flex"> <div className="rounded-full w-10 h-10 bg-gray-500 flex justify-center pt-[2px] ">{user.fname[0]}</div>
                <div className="ml-3 text-black">{user.fname} {user.lname}</div></div>
                <button onClick={()=>navigate("/send?to="+user.fname+"&username="+user.username)} className="bg-orange-700 rounded w-40 pb-1 cursor-pointer hover:bg-orange-600">Send Money</button>
            </div>}
        })}
    </div>
</div>
</div>
    )
}