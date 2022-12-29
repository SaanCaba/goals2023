import React, {useState, useEffect} from 'react'
import uuid from 'react-uuid';
import Swal from 'sweetalert2';
import '../styles/Home.css'
import Goal from './Goal'
import { getDate } from './utils/getDate';

function Home() {
    const[input, setInput] = useState('')
    const [color, setColor] = useState('')
    const[goal, setGoals] = useState<any>()
    const[date, setDate] = useState(getDate())

    useEffect(() => {
        if(goal === undefined){
            let currentStorage = localStorage.getItem('goals')
            if(currentStorage !== null){
                let storage = JSON.parse(currentStorage)
                setGoals(storage)
            }
        }

    }, [goal])

    const handleSubmitGoal = async () => {
        console.log('dasd')
        
        if(input.length > 0){
            if(input.length > 50) return Swal.fire({
                text: 'The input cant be more than 50 letters',
                icon:'error',
                color: '#d64f4f'
            })
            if(color.length === 0) return Swal.fire({
                text: 'Please choose a color',
                icon:'error',
                color: '#d64f4f'
            })
            let currentStorage = localStorage.getItem('goals')
            let id = uuid();
            
            if(currentStorage === null){
               let newGoal : any = {
                goals : [],
               }
               newGoal.goals.push({goalName: input, color:color, id: id, completed:false, date: date})
               setGoals(newGoal)
               setInput('')
               setColor('')
              return window.localStorage.setItem('goals', JSON.stringify(newGoal))
            }
            let goals = JSON.parse(currentStorage)
            if(Array.isArray(goals.goals)){
                goals.goals?.push({goalName: input, color:color, id:id, completed:false, date: date})
               setGoals(goals)
               setInput('')
               setColor('')
               return localStorage.setItem('goals', JSON.stringify(goals))
            }
        }else{
            return Swal.fire({
                text: 'The input cant be empty',
                icon:'error',
                color: '#d64f4f'
            })
        }
        
    }   


  return (
    <div className='h-screen flex-col flex justify-center items-center bg-[#89e8cc]'>
        <div className='flex flex-col gap-3'>
            <span className='text-2xl text-center font-semibold animate-bounce'>Goals for 2023</span>
            <input autoFocus className='font-semibold mr-1 focus:outline-none rounded p-5' style={{width:'500px'}} value={input} onChange={(e)=> setInput(e.target.value) } type="text" />    
            <div className='flex justify-center'>
            <div className='color-picker-container'>
            <input className='ml-1 color-picker' placeholder='colorpicker' type='color' value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            </div>
            <button className='p-2 font-bold  bg-[#43d1a9] rounded mb-5' onClick={() => handleSubmitGoal()}> <span className='animate-pulse'>Submit Goal</span></button>
            </div>
            
            <div className={goal?.goals === undefined ? 'cont-goals  flex justify-center rounded' : 'cont-goals bg-[#64ccb9] p-2 flex justify-center rounded' }>
            {
                goal?.goals !== undefined ? (
                    goal.goals.map((e : {goalName:string, color:string, id:string, completed: boolean, date:string}, i: number) => {
                    //    return <div className='text-xl text-center' key={i}>
                    //     {e}
                    //     </div>
                       return <Goal key={i} goal={e} />
                    })
                )
                : ''
            }
            
            </div>
            
    </div>
  )
}

export default Home