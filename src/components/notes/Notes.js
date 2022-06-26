import {CopyToClipboard} from 'react-copy-to-clipboard';
import { BsClipboard,BsClipboardCheck} from "react-icons/bs";
import { MdOutlineColorLens,MdDelete } from "react-icons/md";
import { VscTriangleDown } from "react-icons/vsc";
import axios from 'axios';
import { useState,useContext } from 'react';
import { ColorComponent } from './Color';
import { formatDate } from '../services/notesFunction';
import { TaskChangeContext ,Focus,TaskList,ColorChange} from "../../helper/Context.js";

export const Notes = () => {
    // clipboard 
    const [clip, setClip] = useState(false);
    const [clipVal, setClipVal] = useState('Copy');
    const [showColor, setShowColor] = useState(false);
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
        setShowColor(false)
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
            setShowColor(false)
            setClipVal('Copy')
        } else{
            setShowColor(false)
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

    const showColorPalette = () => {
        if (showColor === true) {
            setShowColor(false)
        }else {

            setShowColor(true)
        }
        
    }


    return (
        <>
            
                <ColorChange.Provider value ={{colorChange ,setColorChange}}>
                    {listOfTasks.map((task,index) => {
                        return (
                            <div key={task._id}  className={focus === true  && index === fIndex ? 'note-wrapper-triggered ' : 'note-wrapper '}>
                                <button onClick={closeNotesBtn}  className={focus === true ? 'button-x-triggered' : 'hidden'}>X</button>
                                <div  onClick={() => {handleFocus(index,task.color)}}  className={focus ===true  && index === fIndex ? `note-focused group ${colorChange !== '' && index === fIndex ? colorChange : task.color }` : `note-normal group ${colorChange !== '' && index === fIndex ? colorChange : task.color }`} >
                                    <MainNoteContent date={formatDate(task.date)} onChange={() => {setShowColor(false)}} focus={focus} fIndex={fIndex} index={index} onBlur={(e) => {saveTask(task._id,e.currentTarget.textContent)}} text={task.text}></MainNoteContent>
                                    
                                    <div>
                                    <div className='w-full flex justify-end text-lg items-center'>
                                        <p className='author-name mr-1'>- </p>
                                        <p className='author-name hover:cursor-not-allowed px-1 text-base sm:text-lg'>{task.author}</p>
                                    </div>
                                    <div className={focus === true ? "flex sm:hidden  relative items-center justify-between" : "hidden"}>
                                        {/* mobile */}
                                        <div className="flex items-center">
                                            <CopyToClipboard text={task.text} className={focus !== true ? 'hidden' : 'mobile-btns flex sm:ml-8 ml:0 items-center'} >
                                                <div className='flex'>
                                                    <button onClick={handleClip} className='hover:bg-white flex justify-center items-center p-1 sm:w-6 w-[1.3rem] h-[1.3rem] sm:h-6 sm:aspect-square rounded-full'>{clip !== true ? <BsClipboard  strokeWidth={0.5}></BsClipboard> : <BsClipboardCheck strokeWidth={0.5}></BsClipboardCheck>}</button>
                                                </div>
                                            </CopyToClipboard>
                                            <div  >
                                                <div onClick={() => setShowColor(false)}  className={showColor === true ? 'flex items-center h-fit top-[-2.5rem] left-[-0.5rem] pb-2 rounded-lg absolute bg-white ease-in-out transition-all duration-300' : '  hidden '} >
                                                    {console.log(showColor)}
                                                    <ColorComponent taskId={task._id} focus={focus}></ColorComponent>
                                                    <VscTriangleDown className="absolute bottom-[-0.6rem] ml-16  " color='white'></VscTriangleDown>
                                                </div>
                                            
                                                <button  onClick={showColorPalette} className={showColor ? "mobile-btns bg-white " : "mobile-btns bg-transparent"} ><MdOutlineColorLens></MdOutlineColorLens></button>
                                            </div>
                                        </div>
                                        <button onClick={() => { deleteTask(task._id)  }} className="mobile-btns hover:text-red-400"><MdDelete></MdDelete></button>
                                    </div>
                                    <div className='sm:flex hidden sm:items-center  sm:flex-row flex-col-reverse'>
                                        
                                        <CopyToClipboardComponent  clip={clip} focus={focus} text ={task.text} handleClip ={handleClip} clipVal={clipVal}></CopyToClipboardComponent>
                                    </div>
                                    <div className={focus === true ? 'sm:flex hidden  sm:justify-between sm:items-center justify-end w-full sm:flex-row flex-col ' : 'sm:flex hidden  justify-end w-full '} >
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

const MainNoteContent = ({focus,fIndex, onChange,index, text,onBlur,date}) => {
    return (

        <div className='scroll-px-0 overflow-y-auto pr-2 scrollbar flex flex-col break-all'>
            <p className={focus == true  && index === fIndex  ? 'hidden' : ' text-2xl text-center drop-shadow-sm mb-1'}>🔴</p>
            <p contentEditable={true} suppressContentEditableWarning={true}
            
            onBlur={onBlur} onChange={onChange}
            
            className={focus === true ? "outline-none break-words  text-base sm:text-lg    mb-4 " : "outline-none  sm:text-lg text-base  mb-4"}>
                <br></br>{text}
            </p>
            <p className='mt-2 text-xs
             sm:text-md text-gray-500'>{date}</p>
                        
        </div>
    )
}

const CopyToClipboardComponent = ({focus,text,handleClip,clipVal,clip}) => {
    
      return (
        <CopyToClipboard className={focus !== true ? 'hidden' : 'flex  ml-0 items-center group'} text={text} >
            <div className='flex bg-white group-hover:shadow-lg rounded-lg'>
                <button onClick={handleClip} className='bg-white flex justify-center items-center sm:p-3 sm:w-fit w-[1.3rem] h-[1.3rem] sm:h-6 sm:aspect-auto aspect-square rounded-full sm:rounded-xl'>{clip !== true ? <BsClipboard ></BsClipboard> : <BsClipboardCheck ></BsClipboardCheck>}
                    <p className='font-bold sm:md text-sm ml-2 text-yellow-800 self-center '>{clipVal}</p>
                </button>
               
            </div>
        </CopyToClipboard>
      )
}
