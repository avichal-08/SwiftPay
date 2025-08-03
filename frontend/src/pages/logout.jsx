import {useNavigate} from "react-router-dom"
export default function Logout(){
    const token=localStorage.getItem("token")
    const navigate=useNavigate()
    return(
        <div className="bg-neutral-100 w-110 rounded-2xl h-35 mt-50 ml-120 pt-3 shadow-2xl">
            <div className="text-2xl ml-6 tracking-widE">DO YOU REALLY WANT TO LOGOUT?</div>
            <div className="flex ml-50 mt-8 gap-2 h-10 text-xl">
                <button className="w-25 text-white hover:bg-orange-600 cursor-pointer bg-orange-500 rounded-2xl" onClick={()=>navigate("/dashboard")}>Cancel</button>
                <button className="w-25  border border-gray-400 hover:bg-gray-200 cursor-pointer rounded-2xl" onClick={()=>{
                    localStorage.removeItem("token")
                     navigate("/login")
                }}>Logout</button>
            </div>
        </div>
    )
}