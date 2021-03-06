import { FaStickyNote } from "react-icons/fa";

export const Navigation = ({cmshow}) => {
    return (
        <div className='flex justify-center flex-col items-center'>
      
            <h1 className=" text-[2rem] w-fit  sm:mt-3 mt-4  font-bold text-white ">FREEDOM BOARD</h1>
            <p className='text-base text-gray-200  pt-0'>Keep it Short and Simple! 💋</p>
            <button onClick={cmshow} className='sm:text-xl text-3xl flex text-white fixed sm:decoration-wavy items-center  sm:decoration-from-font sm:underline-offset-2 font-bold sm:underline sm:hover:decoration-solid px-4 py-2  bg-green-600 right-0 bottom-0 md:top-0 h-fit rounded-lg md:m-2 my-6 mx-4 shadow-md z-20 
            
            '><FaStickyNote className='mr-2 sm:inline-flex hidden '></FaStickyNote> <span className="sm:hidden ">+</span><p className="hidden sm:inline-flex">Post a message</p></button>
      
    </div>
    )
}