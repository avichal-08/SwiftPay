import { useNavigate } from "react-router-dom"
export default function Status(){
    const navigate=useNavigate()
    return(
        <div className="mt-[17%] ml-[30%] w-[40%] h-[40%] text-white pl-3">
        <div className="text-4xl bg-orange-500 rounded-2xl h-[60%] pl-15 pt-5 pb-5 mb-20">
            Transaction Successful🎉
        </div>
        <button className="bg-orange-700 hover:bg-orange-600 text-xl cursor-pointer rounded-2xl w-[50%] ml-[22%]" onClick={()=>navigate("/dashboard")}>Dashboard</button>
        </div>
    )
}