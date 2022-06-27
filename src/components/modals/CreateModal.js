import { useContext,useState } from "react";
import axios from "axios";
import { FaRegTimesCircle } from "react-icons/fa";
import { API_URL } from "../services/db.js";
import { TaskChangeContext ,CreateModalContext,TaskList} from "../../helper/Context.js";


export const CreateModal = () => {
    const { task, setTask } = useContext(TaskChangeContext);
    const {showModal, setShowModal} = useContext(CreateModalContext);
    const {listOfTasks, setListOfTasks} = useContext(TaskList);
    const [author, setAuthor] = useState('');


    

    // j
    const createTask = (e) => {
       
        e.preventDefault();
        axios.post(API_URL, {
          text : task || "Empty Message",
          author : author  || "Anonymous",
          color : "bg-nyellow",
        }).then(result => {
          console.log('post sucess')
          console.log(result);
        
          setListOfTasks([...listOfTasks, {
            text: result.data.data.text,
            author: result.data.data.author,
            _id: result.data.data._id,
            date: result.data.data.date,
            color: result.data.data.color,
          }]);
    
        }).catch(err => console.log(err));
        setShowModal(false);
        setAuthor('')
        setTask('')
      }

      const doneClicked = (e) => {
        createTask(e);
   
      }

     
    
    
   
    return (

            <div className={showModal === true ? 'create-modal-active' : 'hidden'}>
            
                <button onClick={() => setShowModal(false)} className=" absolute top-0 right-0 m-5"><FaRegTimesCircle size="30" color="white"/></button>
                <form  action="/" method="post" className="relative flex flex-col bg-white p-3 sm:m-5 rounded-lg shadow-md sm:w-[33rem] w-[20rem]">

                    <label htmlFor="todoItem" className="mb-1   font-bold text-2xl text-center text-orange-700">Enter Your Message</label>
                    
                    <textarea autoComplete="off" value={task} onChange={(e) => setTask(e.target.value)} type="text" rows="3" name="todoItem" placeholder='“When life gives you lemons, make lemonade.”'className="scrollbar break-words outline-none border-b-2 mt-3 border-fawn text-base lg:text-xl  text-black px-1 resize-y"/>
                    <div className='mt-3 sm:self-end font-semibold sm:w-[59%] w-full flex sm:flex-row flex-col'>
                        <label  htmlFor="author" className="text-base  mr-2 lg:text-xl">by : </label>
                        <input  autoComplete="off" value={author} onChange={(e) => setAuthor(e.target.value)} type="text" name="author" placeholder="John Doe" className=" font-normal break-words outline-none border-b-2 px-1 w-full mt-2 sm:mt-0 sm:w-auto border-fawn text-base lg:text-xl text-black"/>
                    </div>

                    <button onClick={(e) => doneClicked(e)} className="w-100 bg-green-700 hover:bg-green-800 ease-in transition-all text-white hover:text-gray-300 rounded-md px-2 py-2 mt-6 font-bold lg:text-xl text-lg" type="submit">Done ✨</button>
              </form>
            </div>

    )
}