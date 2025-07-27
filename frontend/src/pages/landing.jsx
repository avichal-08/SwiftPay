import { FiTwitter } from "react-icons/fi"
import { FiGithub } from "react-icons/fi"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
export default function Landing(){
  const navigate=useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL
   useEffect(()=>{
       const ping=async()=>{
        const response=await axios.get(`${apiUrl}/api/v1/ping/`,{
    })
    ping()
  }})//to ping server for its activation at the earliest

    return(
        <div className="min-h-screen w-full relative bg-black">
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",
      }}
    />
  <div className="flex absolute text-white pt-8 ">
    <div className="ml-30 text-2xl font-medium font-serif cursor-pointer tracking-tighter z-1">SwiftPay</div>
    <div className="flex ml-243 text-2xl z-1">
        <a href="https://x.com/Avichal_08" target="_blank" rel="noopener noreferrer" className="cursor-pointer"><FiTwitter /></a>
        <a href="https://github.com/avichal-08/paytm-hl-" target="_blank" rel="noopener noreferrer" className="ml-10"><FiGithub /></a>  
    </div>
  </div>
  <div className="flex absolute">
    <div>
    <div className="flex text-[150px] mt-30 ml-30 h-40 "><div className="text-orange-600">Swift</div><div className="text-white">Pay</div></div>
    <div className="text-white text-xl mt-20 ml-45">Play with dummy currency and feel like real UPI</div>
  <div className="flex  mt-30 ml-70 h-12 font-medium">
    <button onClick={()=>navigate("/howitworks")} className="bg-white rounded w-30 hover:bg-orange-300 cursor-pointer ">How it works</button>
    <button onClick={()=>navigate("/signup")} className="bg-orange-700 text-white rounded w-25 hover:bg-orange-600 cursor-pointer ml-10 shadow-sm shadow-white hover:shadow-md transition-shadow duration-100">Join Now</button>
  </div>
  </div>
  <div className="w-140 h-80 "><img src="https://i.ibb.co/bjTf79GS/Screenshot-1060.png"  alt="loading" className="w-130 h-75 mt-45 ml-20 opacity-80 hover:opacity-100 shadow-md shadow-white hover:shadow-2xl transition-shadow duration-300"/>
  </div>
  </div>
  </div>
    )
}