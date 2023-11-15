import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: "/appintech/*",  // Update path to include wildcard for child routes
    element: <App />,
    children: [
      {
        index: true,  // Use index: true for the default child route
        element: <LoginPage />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* Remove redundant <App /> here */}
  </React.StrictMode>,
);
