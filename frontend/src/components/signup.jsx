import { useNavigate } from "react-router-dom"
import { GrHome } from "react-icons/gr";
import {useRef,useEffect, useState} from "react";
import axios from "axios";
export default function Signup(){
    const navigate=useNavigate()
    const fnameRef=useRef()
    const lnameRef=useRef()
    const unameRef=useRef()
    const passwordRef=useRef()
    const [disable,setDisable]=useState(false)
    const apiUrl = import.meta.env.VITE_API_URL
    const token=localStorage.getItem("token")
        useEffect(()=>{
          const isLog=async ()=>{
            const response=await axios.get(`${apiUrl}/api/v1/me/`,{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            if (response.data.allowed){
              navigate("/dashboard")
            }
          }
          isLog()
        })
    return(
     <div className="min-h-screen w-full bg-black relative">
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#000000",
      backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0),
        radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0),
        radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)
      `,
      backgroundSize: "20px 20px, 30px 30px, 25px 25px",
      backgroundPosition: "0 0, 10px 10px, 15px 5px",
    }}
  />
  <div onClick={()=>navigate("/")} className="absolute text-white text-2xl m-3 cursor-pointer "><GrHome /></div>
  <div className="bg-white h-130 w-80 absolute mt-15 ml-135 rounded-xl">
        <div className="text-3xl font-bold font-sans ml-24 mt-2">Sign Up</div>
        <div className="text-lg text-gray-500 mt-2 mx-5">Enter your information to create an <p className="ml-24">account</p></div>
        <div className="mx-4"><p className="font-medium">First Name</p><input ref={fnameRef} value={fnameRef.current.value} type="text" className="border border-gray-300 rounded h-9 w-full mt-2 text-gray-600" /></div>
        <div className="mx-4 mt-3"><p className="font-medium">Last Name</p><input ref={lnameRef} value={lnameRef.current.value} type="text" className="border border-gray-300 rounded h-9 w-full mt-2 text-gray-600" /></div>
        <div className="mx-4 mt-3"><p className="font-medium">Username</p><input ref={unameRef} value={unameRef.current.value} type="text" className="border border-gray-300 rounded h-9 w-full mt-2 text-gray-600" /></div>
        <div className="mx-4 mt-3"><p className="font-medium">Password</p><input ref={passwordRef} value={passwordRef.current.value} type="text" className="border border-gray-300 rounded h-9 w-full mt-2 text-gray-600" /></div>
        <button disabled={disable} className="mx-4 mt-3 bg-orange-700 hover:bg-orange-600 text-white rounded h-12 w-72 font-medium cursor-pointer" onClick={async ()=>{
          const fname=fnameRef.current.value;
          const lname=lnameRef.current.value;
          const username=unameRef.current.value;
          const password=passwordRef.current.value;
          const response=await axios.post(`${apiUrl}/api/v1/user/signup`,{
            fname,
            lname,
            username,
            password
          });
          if(response.data.isSignup){
          localStorage.setItem("token", response.data.token)
          navigate("/dashboard")}
          else{
            alert(response.data.message)
          }
        }}>Sign Up</button>
        <div className="font-medium text-sm text-gray-800 mt-2 ml-12">Already have an account ?<span className="ml-2 cursor-pointer underline" onClick={()=>navigate("/login")}>Login</span></div>
     </div>
</div>
    )
}


