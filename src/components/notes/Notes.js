import {CopyToClipboard} from 'react-copy-to-clipboard';
import { BsClipboard,BsClipboardCheck} from "react-icons/bs";
import axios from 'axios';
import { useState,useContext } from 'react';
import { ColorComponent } from './Color';
import { formatDate } from '../services/notesFunction';
import { TaskChangeContext ,Focus,TaskList,ColorChange} from "../../helper/Context.js";

export const Notes = () => {
    // clipboard 
    const [clip, setClip] = useState(false);
    const [clipVal, setClipVal] = useState('Copy');
    const { focus, setFocus } = useContext(Focus);
    const [fIndex, setFIndex] = useState(-1);
    const {listOfTasks, setListOfTasks} = useContext(TaskList);
    const { task, setTask } = useContext(TaskChangeContext);
    const [colorChange ,setColorChange] = useState('');
    
    function refreshPage() {
        window.location.reload(false);
      }

    //handle close btn on clicked when notes is focused
    const closeNotesBtn = () => {
        if (colorChange !== ''){

            setColorChange('');
            refreshPage()
        }
        setFocus(false);  
        setClip(false);
        setClipVal('Copy') 
    }

    // handle When the user clicked a specific note
    const handleFocus =(index) => {
        setFocus(true)
        setFIndex(index)
        console.log(`focused on ${index}`)
      }

    const handleClip = () => {
        if(clip) {
            setClip(false)
            setClipVal('Copy')
        } else{
            
            setClip(true)
            setClipVal('Copied')
            
        }
    }

    

    const saveTask = (id,newText) => {
       
        setTask(newText);
        console.log(`id: ${id}`)
        
        return axios.put(`https://freedom-board-princess.herokuapp.com/api/${id}`, {
            text : newText,
          }).then(result => {
            console.log(`${newText}  has been saved`);
            setTask('');
           
        }).catch(err => console.log(err));
      
        } 

    const deleteTask = (id) => {
        setFocus(false);
        
        axios.delete(`https://freedom-board-princess.herokuapp.com/api/${id}`).then(
            (result) => {
            setFocus(false)
            setListOfTasks(listOfTasks.filter((task) => {
                
                return task._id !== id;
                
            }))
            }
        ).catch((error) => {
            console.log(error)
        })
        
        }


    return (
        <>
            
                <ColorChange.Provider value ={{colorChange ,setColorChange}}>
                    {listOfTasks.map((task,index) => {
                        return (
                            <div key={task._id}  className={focus === true  && index === fIndex ? 'note-wrapper-triggered ' : 'note-wrapper'}>
                                <button onClick={closeNotesBtn}  className={focus === true ? 'button-x-triggered' : 'hidden'}>X</button>
                                <div  onClick={() => {handleFocus(index,task.color)}}  className={focus ===true  && index === fIndex ? `note-focused group ${colorChange !== '' && index === fIndex ? colorChange : task.color }` : `note-normal group ${colorChange !== '' && index === fIndex ? colorChange : task.color }`} >
                                    <MainNoteContent focus={focus} fIndex={fIndex} index={index} onBlur={(e) => {saveTask(task._id,e.currentTarget.textContent)}} text={task.text}></MainNoteContent>
                    
                                    <div>
                                    <div className='w-full flex justify-end'>
                                        <p className='author-name mr-1'>- </p>
                                        <p className='author-name hover:cursor-not-allowed px-1'>{task.author}</p>
                                    </div>
                                    <div className='flex sm:items-center  sm:flex-row flex-col-reverse'>
                                        <p className='mt-2 text-sm sm:text-base'>{formatDate(task.date)}</p>
                                        <CopyToClipboardComponent  clip={clip} focus={focus} text ={task.text} handleClip ={handleClip} clipVal={clipVal}></CopyToClipboardComponent>
                                    </div>
                                    <div className={focus === true ? 'flex sm:justify-between sm:items-center justify-end w-full flex-wrap' : 'flex-wrap flex justify-end w-full '} >
                                        <ColorComponent taskId={task._id} focus={focus}></ColorComponent>
                                        <button onClick={() => { deleteTask(task._id)  }} className={focus === true ? 'btn-delete-focus ' : 'hidden'}>Delete</button>
                                    </div>
                                </div>
                    
                                </div>
                            </div>
                        )
                    })}
                </ColorChange.Provider>
        </>
    )
}

const MainNoteContent = ({focus,fIndex, index, text,onBlur}) => {
    return (

        <div className='scroll-px-0 overflow-y-auto pr-2 scrollbar flex flex-col'>
            <p className={focus == true  && index === fIndex  ? 'hidden' : ' text-2xl text-center drop-shadow-sm mb-1'}>🔴</p>
            <p contentEditable={true} suppressContentEditableWarning={true}
            
            onBlur={onBlur}
            
            className={focus === true ? "outline-none break-words sm:text-2xl text-xl font-indie font-bold sm:mb-8 mb-4 " : "outline-none sm:text-2xl text-xl font-indie font-bold mb-8"}>
                <br></br>{text}
            </p>
                        
        </div>
    )
}

const CopyToClipboardComponent = ({focus,text,handleClip,clipVal,clip}) => {
    
      return (
        <CopyToClipboard className={focus !== true ? 'hidden' : 'flex sm:ml-8 ml:0 items-center'} text={text} >
            <div className='flex'>
                <button onClick={handleClip} className='bg-white flex justify-center items-center p-1 w-6 h-6 aspect-square rounded-full'>{clip !== true ? <BsClipboard size={30}></BsClipboard> : <BsClipboardCheck size={30}></BsClipboardCheck>}</button>
                <p className='font-bold ml-2 text-yellow-800 self-center '>{clipVal}</p>
            </div>
        </CopyToClipboard>
      )
}
