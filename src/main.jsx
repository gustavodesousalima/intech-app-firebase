import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/login/LoginPage.jsx'

const router = createBrowserRouter([
  {
    path: "/app-intech/",
    element: <App />,
    children: [
     {
      path: "/app-intech/",
      element: <Home />
     }, 
    ]
  }
]) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <App />
  </React.StrictMode>,
)
