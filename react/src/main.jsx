import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './component/index.jsx'
import Bill from './component/Bill.jsx'
import Menu from './component/Menu.jsx'
import Admin from './component/admin.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
        <React.StrictMode>

        <Routes>
            <Route index element={<Login/>}/>
            <Route path="bill" element={<Bill/>}/>
            <Route path="menu" element={<Menu/>}/>
            <Route path="admin" element={<Admin/>}/>

        </Routes>
        </React.StrictMode>
  </BrowserRouter>

  ,
)
