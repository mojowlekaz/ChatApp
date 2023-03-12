import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, createHashRouter,  createBrowserRouter, RouterProvider} from 'react-router-dom';
import {createContext} from "react";
import Error from '/Users/macbook/chatapp/src/Components/Error.js';
import Sidebar from './Components/Sidebar';
import {ChatProvider } from "/Users/macbook/chatapp/src/Components/Mainpage.js"
import Mainpage from './Components/Mainpage';
import Allusers from './Components/Allusers';
import AddFriend from './Components/AddFriend';


const router = createHashRouter([

  {
    path: "/",
    element: <App />,
  },
  {
  path: "chat",
  index: true,
  element: <Mainpage>
    <Sidebar  />
    </Mainpage>
    }, 

         {
    path: "*",
    element: <Error />
      }, 
      {
        path: "allusers",
        element: <Mainpage>
          <Allusers  />
          </Mainpage>
          }, 
          {
            path: "chats",
            element: <Mainpage>
              <Sidebar  />
              </Mainpage>
              }, 
              {
                path: "/add",
                element: <Mainpage>
                  <AddFriend  />
                  </Mainpage>
                  }, 
  


  ])



  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(

 <RouterProvider router={router} /> 

  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


 // { 
  //   data.map((datas, i) => (


  //      <Card  name={datas.name} UsersAddr={datas.UsersAddr} datas={datas} />

      
  //   ))
  // } 