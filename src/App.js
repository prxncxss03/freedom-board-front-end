import {useState,useEffect} from 'react';
import { TaskChangeContext,CreateModalContext ,TaskList,Focus} from './helper/Context';
import { Notes } from './components/notes/Notes';
import {Loader } from './components/Loader'
import axios from 'axios';
import { Navigation } from './components/Navigation';
import { CreateModal } from './components/modals/CreateModal';
import {Footer} from './components/Footer';


function App() {
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  const [task, setTask] = useState('');
  const [focus, setFocus] = useState(false);
  const [listOfTasks, setListOfTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);


//  fetch all the data from the database
  useEffect (() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },1500);
    axios.get('https://freedom-board-princess.herokuapp.com/api/').then(result => {
      console.log(result.data.data);
      setListOfTasks(result.data.data);
      
    }).catch(err => {
      console.log(`err : ${err}`);
    })
  },[])


  return (
     
    
      <TaskList.Provider value={{listOfTasks, setListOfTasks}}>
        <CreateModalContext.Provider value={{showModal, setShowModal}}>
          <TaskChangeContext.Provider value={{task, setTask}}>
            <Focus.Provider value={{focus, setFocus}}>
                  
            
                <div className={showModal === true || focus === true  ? 'main overflow-hidden ease-in-out transition-all duration-1000' : 'overflow-y-auto scrollbar main'}>
                  {loading === true ? (<Loader></Loader>)  : (
                    
                    <>
                      <CreateModal ></CreateModal>
                        <div className='bg-inherit'>
                          <Navigation cmshow={() => setShowModal(true)}/>
                            <div className='flex items-center flex-col bg-inherit px-10 py-5'>
                              <div className='flex flex-wrap justify-center '>
                                
                                <Notes ></Notes>
                              </div>
                            </div>
                        </div>
                        <Footer ></Footer>
                    </>
                  
                  )
                  }
                </div>
          
        </Focus.Provider>
    
      </TaskChangeContext.Provider>
    </CreateModalContext.Provider>
  </TaskList.Provider>
                  
                

    )};

export default App;

