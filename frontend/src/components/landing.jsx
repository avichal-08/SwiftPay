import { FiTwitter } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import {useNavigate} from "react-router-dom"
export default function Landing(){
  const navigate=useNavigate()
    return(
        <div className="min-h-screen w-full relative bg-black">
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",
      }}
    />
  <div className="flex absolute text-white pt-8 ">
    <div className="ml-50 text-2xl font-medium font-serif cursor-pointer">SwiftPay</div>
    <div className="flex ml-180 text-2xl">
        <a href="https://x.com/Avichal_08" target="_blank" rel="noopener noreferrer"><FiTwitter /></a>
        <a href="https://github.com/avichal-08/paytm-hl-" target="_blank" rel="noopener noreferrer" className="ml-10"><FiGithub /></a>  
    </div>
  </div>
  <div className="flex absolute mt-130 ml-140 h-12">
    <button onClick={()=>navigate("/signup")} className="bg-orange-700 text-white rounded w-25 hover:bg-orange-600 cursor-pointer">Sign Up</button>
    <button onClick={()=>navigate("/signup")} className="bg-orange-700 text-white rounded w-25 hover:bg-orange-600 cursor-pointer ml-10">Log In</button>
  </div>
  </div>
    )
}