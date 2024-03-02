import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const Todolist = ({apiResponseData,deleteTodo}) => {

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
