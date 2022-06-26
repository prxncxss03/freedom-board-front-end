import { FaStickyNote } from "react-icons/fa";

export const Navigation = ({cmshow}) => {
    return (
        <div className='flex justify-center flex-col items-center'>
      
            <h1 className="font-indie sm:text-3xl text-[2.5rem] w-fit  sm:mt-3 mt-4  font-bold text-white ">FREEDOM BOARD</h1>
            <p className='text-xl text-white sm:pt-2 pt-0'>Keep it Short and Simple! 💋</p>
            <button onClick={cmshow} className='sm:text-2xl text-3xl flex text-white fixed sm:decoration-wavy  sm:decoration-from-font sm:underline-offset-2 font-bold sm:underline sm:hover:decoration-solid px-4 py-2 sm:bg-[#836953] bg-green-600 right-0 sm:top-0 bottom-0 rounded-lg m-2 shadow-md z-20 
            
            '><FaStickyNote className='mr-2 sm:inline-flex hidden '></FaStickyNote> <span className="sm:hidden ">+</span><p className="hidden sm:inline-flex">Post a message</p></button>
      
    </div>
    )
}