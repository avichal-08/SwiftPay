import { useSearchParams,useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect ,useState} from "react"
import Loader from "../components/loader"
import Status from "../components/status"
export default function Confirmation(){
    const [searchParam]=useSearchParams();
    const navigate=useNavigate()
    const reciever=searchParam.get("to")
    const username=searchParam.get("username")
    const amount=searchParam.get("amount")
    const [loading,setLoading]=useState(false)
    const [success,setSuccess]=useState(false)
    const apiUrl = import.meta.env.VITE_API_URL
    const token=localStorage.getItem("token")
    useEffect(()=>{
      if(!token)
        navigate("/login")
    },[])

    if(loading){
      return(
        <div>
          <Loader/>
        </div>
      )
    }
    else if(success){
      return(
        <Status/>
      )
    }
    else return(
       <div className="h-screen w-full bg-[#0f0f0f] relative text-white">
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
     
    <div className="absolute bg-white w-100 h-80 ml-130 mt-30 rounded-xl">
        <div className="text-black tracking-wider ml-27 mt-5 text-2xl font-bold font-sans">Please Confirm</div>
        <div className="text-black text-2xl font-sans mt-8 ml-4">Sending To: {reciever}</div>
        <div className="text-black text-2xl font-sans mt-4 ml-4">Username: {username}</div>
        <div className="text-black text-2xl font-sans mt-5 ml-4 flex gap-3">Amount (in Rs):<div className="text-3xl font-bold">₹{amount}</div></div>
        <button className="bg-orange-700 hover:bg-green-600 cursor-pointer w-90 mx-4 h-10 rounded mt-8 text-xl" onClick={async()=>{
          setLoading(true)
          const response=await axios.post(`${apiUrl}/api/v1/account/transfer`,{
            amount,
            toUsername:username
          },{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          if(response.data.message==="transaction successful"){
            setLoading(false)
            setSuccess(true)
          }
          else{
            alert(response.data.message)
            navigate("/dashboard")
          }
      }}>Confirm</button>
    </div>
  </div>
    )
}