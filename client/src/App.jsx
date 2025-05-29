import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import RegisterForm from './pages/RegisterForm'
import ProtectedRoute from './components/ProtectedRoute'
import About from './pages/About'

function App() {

  return (
    
    <div className='app-container'> 
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute> 
        } />

      <Route path='/about' element={<About />}/>
      </Routes>
    </div>
  )
}

export default App
