import React from 'react'
import Header from './components/Header'
import CreateTodo from './components/CreateTodo'
import Todolist from './components/Todolist'
import './App.css'

const App = () => {
  return (
    <div >
      <Header/>
      <CreateTodo/>
      <Todolist/>
    </div>
  )
}

export default App
