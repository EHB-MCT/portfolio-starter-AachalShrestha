import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import Home from './Pages/Home.jsx';
import Profile from './Pages/Profile.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);


