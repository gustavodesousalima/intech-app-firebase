import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import FeedPage from './pages/feed/FeedPage';
import { AuthProvider } from './context/authContext';
import './index.css'
import App from './App';

const router = createHashRouter([
  {
    path: '/*',
    element: <App />
  },

  {
    path: '/',
    element: <LoginPage />
  },

  {
    path: '/feed',
    element: <FeedPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  </React.StrictMode>,
)