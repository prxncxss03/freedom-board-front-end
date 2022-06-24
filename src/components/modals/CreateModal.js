import { useContext,useState } from "react";
import axios from "axios";
import { FaRegTimesCircle } from "react-icons/fa";
import { TaskChangeContext ,CreateModalContext,TaskList} from "../../helper/Context.js";


export const CreateModal = () => {
    const { task, setTask } = useContext(TaskChangeContext);
    const {showModal, setShowModal} = useContext(CreateModalContext);
    const {listOfTasks, setListOfTasks} = useContext(TaskList);
    const [author, setAuthor] = useState('');


    

    const checkLength = (text) => {
        if (text.length > 70){
            setTask(text)
        } else{
            alert('70 characters only')
        }
    }
    const createTask = (e) => {
       
        e.preventDefault();
        axios.post('http://localhost:5000/api/', {
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
                <form  action="/" method="post" className="relative flex flex-col bg-white p-3 m-5 rounded-lg shadow-md w-[33rem] ">

                    <label htmlFor="todoItem" className="mb-3  font-indie font-bold text-3xl text-center text-orange-700">ENTER YOUR MESSAGE</label>
                    
                    <input autocomplete="off" value={task} onChange={(e) => setTask(e.target.value)} type="text" name="todoItem" placeholder='“When life gives you lemons, make lemonade.”'className="break-words font-semibold outline-none border-b-2 mt-3 border-fawn text-xl text-black px-1"/>
                    <div className='mt-3 self-end font-semibold w-[49%] flex'>
                        <label  htmlFor="author" className="text-xl mr-2">by : </label>
                        <input  autocomplete="off" value={author} onChange={(e) => setAuthor(e.target.value)} type="text" name="author" placeholder="John Doe" className=" break-words outline-none border-b-2 px-1  border-fawn text-xl text-black"/>
                    </div>

                    <button onClick={(e) => doneClicked(e)} className="w-100 bg-green-700 hover:bg-green-800 ease-in transition-all text-white hover:text-gray-300 rounded-md px-2 py-2 mt-6 font-bold text-xl" type="submit">Done ✨</button>
              </form>
            </div>

    )
}