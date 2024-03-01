import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const Todolist = () => {

const [apiResponseData,setResponseData] = useState();
const  fetchtodos = async() => {
    const response = await axios.get('https://jan-project-aa287-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json')
    setResponseData(response.data);
  }
  //fetch to do
  // call only one time
  useEffect(()=>{fetchtodos()},[])
  console.log(apiResponseData);

  // Remove to do
  const deleteTodo = async(itemId) => {
    await axios.delete('https://jan-project-aa287-default-rtdb.asia-southeast1.firebasedatabase.app/todo/'+itemId+'.json')
    fetchtodos();
  }
  return (
    <div>
      {/* Rendering an object */}
      { apiResponseData && (
        Object.keys(apiResponseData).map(key => {
            const {task,description,priority,date} = apiResponseData[key]
            return (
            <div className={'todo-item ' + priority} key={key}>
                <div className="todo-item-left">
                    <h4>{task}</h4>
                    <p>{description}</p>
                </div>
                <div className="todo-item-right">
                    <h4>{date}</h4>
                    <button onClick={()=>deleteTodo(key)} className='to-do-delete' >❌</button>
                </div>
            </div>
            )
      })

      )}
    </div>
  )
}

export default Todolist
