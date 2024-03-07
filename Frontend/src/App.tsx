import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/signup'
import Signin from './components/signin'
import { Dashboard } from './components/Dashboard'
import { AddTodo } from './Pages/AddTodo'

function App() {
  return (
    <div>
      <BrowserRouter>
      
        <Routes>
          <Route path='/signup' element={<Signup ></Signup>}></Route>
          <Route path='/signin' element={<Signin ></Signin>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/addTodo' element={<AddTodo></AddTodo>}></Route>
        </Routes>
      
      </BrowserRouter>
      
    </div>
   
  )
}

export default App
