import { motion } from "motion/react"
export default function Loader(){
    return(
        <div className="flex gap-2 mt-[20%] ml-[45%]">
            <motion.div 
            initial={{
                y:0
            }}
            animate={{
                y:[0,20,0]
            }}
            transition={{
                duration:0.9,
                repeat:Infinity
            }} 
            className="bg-orange-600 rounded-full h-10 w-10"></motion.div>
            <motion.div
            initial={{
                y:0
            }}
            animate={{
                y:[0,20,0]
            }}
            transition={{
                duration:1,
                repeat:Infinity
            }}
            className="bg-orange-600 rounded-full h-10 w-10"></motion.div>
            <motion.div
            initial={{
                y:0
            }}
            animate={{
                y:[0,20,0]
            }}
            transition={{
                duration:1.1,
                repeat:Infinity
            }} 
            className="bg-orange-600 rounded-full h-10 w-10"></motion.div>
        </div>
    )
}