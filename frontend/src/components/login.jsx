import { useNavigate } from "react-router-dom"
import { GrHome } from "react-icons/gr";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
export default function Login(){
    const navigate=useNavigate()
    const usernameRef=useRef()
    const passwordRef=useRef()
    const apiUrl = import.meta.env.VITE_API_URL
    const token=localStorage.getItem("token")
    useEffect(()=>{
      if(token){
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
    }
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
  <div className="bg-white h-90 w-80 absolute mt-30 ml-135 rounded-xl">
        <div className="text-3xl font-bold font-sans ml-26 mt-2">Log In</div>
        <div className="text-[16px] font-medium text-gray-500 mt-2 mx-10">Enter your credentials to access <p className="ml-18">your account</p></div>
        <div className="mx-4"><p className="font-medium">Username</p><input ref={usernameRef} type="text" className="border border-gray-300 rounded h-9 w-full mt-2 text-gray-600" /></div>
        <div className="mx-4 mt-3"><p className="font-medium">Password</p><input ref={passwordRef} type="text" className="border border-gray-300 rounded h-9 w-full mt-2 text-gray-600" /></div>
        <button className="mx-4 mt-3 bg-orange-700 hover:bg-orange-600 text-white rounded h-12 w-72 font-medium cursor-pointer" onClick={async ()=>{
          const username=usernameRef.current.value
          const password=passwordRef.current.value
          const response=await axios.post(`${apiUrl}/api/v1/user/login`,{
            username,
            password
          });
          if(response.data.isLogin){
          localStorage.setItem("token", response.data.token)
          navigate("/dashboard")}
          else{
            alert(response.data.message)
          }
        }}>Log in</button>
        <div className="font-medium text-sm text-gray-800 mt-2 ml-12">Don't have an account ?<span className="ml-2 cursor-pointer underline" onClick={()=>navigate("/signup")}>Sign Up</span></div>
     </div>
</div>
    )
}