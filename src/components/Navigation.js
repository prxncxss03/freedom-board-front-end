import { FaStickyNote } from "react-icons/fa";

export const Navigation = ({cmshow}) => {
    return (
        <div className='flex justify-center flex-col items-center'>
      
            <h1 className="font-indie text-3xl  w-fit  mt-3  font-bold text-white ">FREEDOM BOARD</h1>
            <p className='text-xl text-white pt-2'>Keep it Short and Simple! 💋</p>
            <button onClick={cmshow} className='text-2xl flex text-white fixed decoration-wavy decoration-from-font underline-offset-2 font-bold underline hover:decoration-solid px-4 py-2 bg-[#836953] right-0 rounded-lg m-2 shadow-md z-20 
            
            '><FaStickyNote className='mr-2 '></FaStickyNote> Post a message</button>
      
    </div>
    )
}