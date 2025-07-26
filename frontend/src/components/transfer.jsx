import { useSearchParams,useNavigate } from "react-router-dom"
import axios from "axios"
import {useRef} from "react"
import { useEffect } from "react";
export default function Send(){
  const [searchParam]=useSearchParams();
    const reciever=searchParam.get("to")
    const username=searchParam.get("username")
    const amountRef=useRef()
    const navigate=useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const token=localStorage.getItem("token")
    useEffect(()=>{
      if(!token)
        navigate("/login")
    },[])
    return(
      <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
        <div className="text-4xl ml-2 cursor-pointer hover:text-orange-600" onClick={()=>navigate("/dashboard")}>←</div>
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
   repeating-linear-gradient(45deg, rgba(255, 140, 0, 0.12) 0, rgba(255, 140, 0, 0.12) 1px, transparent 1px, transparent 22px),
        repeating-linear-gradient(-45deg, rgba(255, 69, 0, 0.08) 0, rgba(255, 69, 0, 0.08) 1px, transparent 1px, transparent 22px)
        `,
        backgroundSize: "44px 44px",
      }}
    />
     
    <div className="absolute bg-white w-100 h-95 ml-130 mt-30 rounded-xl">
        <div className="text-black ml-30 mt-5 text-2xl font-bold font-sans">Send Money</div>
        <div className="text-black text-2xl font-sans mt-12 ml-4">Name: {reciever}</div>
        <div className="text-black text-2xl font-sans mt-4 ml-4">Username: {username}</div>
        <div className="text-black text-xl font-sans mt-5 ml-4">Amount (in Rs):</div>
        <input ref={amountRef} type="Number" placeholder="Enter Amount" className="bg-white w-90 mx-4 mt-5 h-10 text-gray-600 text-xl pl-3 pb-1 rounded border border-black"/>
        <button className="bg-orange-700 hover:bg-orange-600 cursor-pointer w-90 mx-4 h-10 rounded mt-8 text-xl" onClick={async()=>{
          try{
            const amount=amountRef.current.value
          const response=await axios.post(`${apiUrl}/api/v1/account/transfer`,{
            amount,
            toUsername:username
          },{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          if(response.data.message==="transaction successful"){
            alert("transaction successful")
            navigate("/dashboard")
          }
          else{
            alert(response.data.message)
          }
        }
        catch(err){
          console.log(err)
        }
      }}>Initiate Transfer</button>
    </div>
  </div>
    )
}