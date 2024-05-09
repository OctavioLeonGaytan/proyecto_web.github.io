import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Computers from './pages/Computers';
import Branchs from './pages/Branchs';
import Manteniences from './pages/Manteniences';

import './css/main.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Root</h1>,
    errorElement: <h1>404 Not found...</h1>
  },
  {
    path: "/inicio-sesion",
    element: <SignIn/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [
      {
        path: "planteles/",
        element: <Branchs />
      }, 
      {
        path: "computadoras/",
        element: <Computers />
      },
      {
        path: "mantenimientos/",
        element: <Manteniences />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>
  </>
)