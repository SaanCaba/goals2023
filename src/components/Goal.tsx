import React, {useState, useEffect} from 'react'

import '../styles/Goal.css'

type Props = {
  goal: {
    goalName : string,
    color:string,
    id: string,
    completed: boolean,
    date: string
  }
}

function Goal({goal} : Props) : JSX.Element {

  const [complete, setComplete] = useState(false)


  useEffect(() => {
    if(goal.completed === true){
      return setComplete(true)
    }
  },[complete])


  const handleComplete = (id : string) =>{
    let store = localStorage.getItem('goals')
    if(store !== null){
      let completeGoal = JSON.parse(store)
      console.log(completeGoal.goals)
      for(let i = 0; i < completeGoal.goals.length; i++){
        if(completeGoal.goals[i].id === id){
          completeGoal.goals[i].completed = true
        }
      }
      setComplete(true)
      localStorage.setItem('goals', JSON.stringify(completeGoal))
    }
  }

  return (
    <div style={{backgroundColor: goal.color}} className={complete ? 'relative w-96  h-48 m-1 rounded' :`relative w-96  flex-wrap h-48 m-1 rounded box-goal`}>
      <div className='h-full relative'>
     <h2 className='text-center font-bold text-white'>{goal.date}</h2>
        <p  style={{overflowWrap:'break-word'}} className={'text-center text-white font-bold text-xl'}>{goal.goalName}</p>
      <div style={{bottom:'3px', left:'39%'}} className='absolute flex items-end justify-center'>
      <button onClick={() => handleComplete(goal.id)} className='p-2 text-white font-bold rounded bg-[#72e889]' >Complete</button>
      </div>
      </div>
      {
        complete === true ?(
          <div style={{height:'100%', top:'0px'}} className='completeTask absolute flex justify-center items-center'>
          <div  className='text-2xl'>
            Goal Completed!
          </div>
          </div>
          
        )
         : ''
      }
    </div>
  )
}

export default Goal