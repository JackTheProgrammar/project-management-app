import { React } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import DashBoard from './DashBoard'
import Tasks from './Tasks'
import Taskdetails from './Taskdetails'
import Projects from './Projects'

import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/Projects" replace />} />
      <Route path='/projects' element={<Projects />}></Route>
      <Route path='/dashboard' element={<DashBoard />}></Route>
      <Route path='/tasks' element={<Tasks />}></Route>
      <Route path='/taskdetails/:taskId' element={<Taskdetails />}></Route>
    </Routes>
  </BrowserRouter>


)
