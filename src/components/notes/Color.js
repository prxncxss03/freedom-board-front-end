import { useState ,useContext} from 'react';
import { ColorChange } from '../../helper/Context';
import axios from 'axios';


export const ColorComponent = ({taskId ,focus}) => {
    const [color,setColor] = useState('')
    const { colorChange ,setColorChange } = useContext(ColorChange);
    

    const listOfColors = [
        {
            colorId : 1,
            name: 'yellow',
            color: 'bg-nyellow',
            role: 'option',
            className : 'yellow-color-item color-item',
           
        },
        {
            colorId : 2,
            name: 'peach',
            color: 'bg-npeach',
            role: 'option',
            className : 'peach-color-item color-item'
        },
        {
            colorId : 3,
            name: 'green',
            color: 'bg-ngreen',
            role: 'option',
            className : 'green-color-item color-item',
        },
        {
            colorId : 4,
            name: 'blue',
            color: 'bg-nblue',
            role: 'option',
            className : 'blue-color-item color-item',
        },
        {
            colorId : 5,
            name: 'violet',
            color: 'bg-nviolet',
            role: 'option',
            className : 'violet-color-item color-item',
        }    
    ]

    
    const handleColor = (color,id) => {
        setColorChange(color);
        return axios.put(`https://freedom-board-princess.herokuapp.com/api/color/${id}`, {
            color,
          }).then(result => {
            console.log(`${color}  has been saved`);
            
            
           
        }).catch(err => console.log(err));
       
    }

    return (

        <div role='listbox' id='test' className={focus === true ? 'list-color' : 'hidden'} >
            {listOfColors.map((eachColor) => {
                return (

                <div key={eachColor.colorId} role={eachColor.role}  className={eachColor.className}
                    onClick={() =>{handleColor(eachColor.color,taskId)}}>
                      
                </div>
                )
                })
            }
            {console.log(color)}
        </div>
    )
}