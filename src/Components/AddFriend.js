import {  Avatar, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useRef } from "react";
import {RiMessage2Fill} from "react-icons/ri";
import "/Users/macbook/chatapp/src/Styles/Sidebar.css"
import {FaBars, FaTimesm, FaUserFriends} from "react-icons/fa";
import Sidebarview from './Mainpage';
import {IoPersonAddSharp} from "react-icons/io5"
import {MdSearch, MdDelete} from "react-icons/md"
import {Context } from "/Users/macbook/chatapp/src/Components/Mainpage.js"
import { Navigate } from 'react-router-dom';
import {abi, CA} from "./ContextAbi.js"
import {Link} from "react-router-dom"
export default function Sidebar() {

useEffect( () => {
  
})

const ethers = require("ethers");
const [click, setClick] = useState(false)
const {title} = useContext(Context);
const {walletAddress} = useContext(Context)
const {userName} = useContext(Context)
console.log(walletAddress)






if(walletAddress.length > 0 && userName.length > 0 ) {
return (


   <div>
       
<div className="split left">

<Typography variant="h6" color='#fff' component="h6">Web3 chatApp</Typography><br />

<Typography variant="h5" color='#fff' component="h6">Username: {userName}</Typography>
       
           <div className='home'>
          
               <ul>
            <li>
               <Link to="chats" className='Link'><Typography variant="body"  color='#fff' component="body">  <RiMessage2Fill  style={{fontSize: "20px", color:'#ff'}} /> Chat </Typography></Link>
            </li>
           
            <li>
               <Link to="/allusers" className='Link'><Typography variant="body"  color='#fff' component="body">  <IoPersonAddSharp   style={{fontSize: "20px", color:'#ff'}} /> All Users</Typography></Link>
            </li>
           
            <li>
               <Link className='Link'><Typography variant="body"  color='#fff' component="body">  <MdSearch  style={{fontSize: "20px", color:'#ff'}}  /> Search</Typography></Link>
            </li>
           
            <li>
               <Link to="" className='Link'><Typography variant="body"  color='#fff' component="body">  <FaUserFriends  style={{fontSize: "20px", color:'#ff'}}  /> ADD friend</Typography></Link>
            </li>
            <li>
               <Link className='Link'><Typography variant="body"  color='#fff' component="body">  <MdDelete  style={{fontSize: "20px", color:'#ff'}}  /> Delete friend</Typography></Link>
            </li>
            </ul>

           </div> 

</div>



<div className="split right">

  

</div>
   </div>

   
 )
}else{
   // <Navigate to="/" replace={true} />
}
}
