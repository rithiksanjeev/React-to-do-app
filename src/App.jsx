import React from 'react'
import Header from './components/Header'
import CreateTodo from './components/CreateTodo'
import Todolist from './components/Todolist'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
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
    <div >
      <Header/>
      <CreateTodo fetchtodos ={fetchtodos}/>
      <Todolist apiResponseData= {apiResponseData} deleteTodo={deleteTodo}/>
    </div>
  )
}

export default App
