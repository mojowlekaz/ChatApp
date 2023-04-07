import { Link, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useRef } from "react";
import {RiMessage2Fill} from "react-icons/ri";
import {FaBars, FaTimesm, FaUserFriends} from "react-icons/fa";
import Sidebarview from './Mainpage';
import {IoPersonAddSharp} from "react-icons/io5"
import {MdSearch, MdDelete} from "react-icons/md"
import {Context } from "/Users/macbook/chatapp/src/Components/Mainpage.js"
import { Navigate, NavLink } from 'react-router-dom';
import {abi, CA} from "./ContextAbi.js"
import "/Users/macbook/chatapp/src/Styles/Allusers.css"


export default function Card({datas}) {

  useEffect( () => {
    FetchAllusers()
  })
  
  const ethers = require("ethers");
  const [data, setData] = useState()
  const {title} = useContext(Context);
  const {walletAddress} = useContext(Context)
  const {userName} = useContext(Context)
  console.log(walletAddress)
  
  async function FetchAllusers() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer =   provider.getSigner();
    // let signature = await signer.signMessage("");
    let  contract = new ethers.Contract(CA,  abi, signer);
    let walletAddress = await signer.getAddress();
    
  const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
   const user = await contract.FetchAllusers()
   setData(user)
  console.log(user)

  const tx =  {
  from: walletAddress,
  to: CA,
  gaslimit: 850000000000,
  gasprice: 50000000000,

};
console.log(tx);
 }

  if(walletAddress.length > 0 && userName.length > 0 ) {
    return (
    
    
    //    <div>
           
    // <div className="split left">
    
    // <Typography variant="h6" color='#fff' component="h6">Web3 chatApp</Typography><br />
    
    // <Typography variant="h5" color='#fff' component="h6">Username: {userName}</Typography>
           
    //            <div className='home'>
              
    //                <ul>
    //             <li>
    //                <NavLink to="chat" className='Link'><Typography variant="body"  color='#fff' component="body">  <RiMessage2Fill  style={{fontSize: "20px", color:'#ff'}} /> Chat </Typography></NavLink>
    //             </li>
               
    //             <li>
    //                <NavLink className='Link'><Typography variant="body"  color='#fff' component="body">  <IoPersonAddSharp   style={{fontSize: "20px", color:'#ff'}} /> All Users</Typography></NavLink>
    //             </li>
               
    //             <li>
    //                <NavLink className='Link'><Typography variant="body"  color='#fff' component="body">  <MdSearch  style={{fontSize: "20px", color:'#ff'}}  /> Search</Typography></NavLink>
    //             </li>
               
    //             <li>
    //                <NavLink to="/add" className='Link'><Typography variant="body"  color='#fff' component="body">  <FaUserFriends  style={{fontSize: "20px", color:'#ff'}}  /> ADD friend</Typography></NavLink>
    //             </li>
    //             <li>
    //                <NavLink className='Link'><Typography variant="body"  color='#fff' component="body">  <MdDelete  style={{fontSize: "20px", color:'#ff'}}  /> Delete friend</Typography></NavLink>
    //             </li>
    //             </ul>
    
    //            </div> 
    
    // </div>
    
    
    
    <div className="split right">

    <Typography variant="h5" color='#fff' style={{justifyContent: "center", display: "flex"}} component="h6">ALL USERS</Typography> <br />
<div className='grid'>

<div className='List1'>

<h3>{datas?.name}</h3>
<h3>{datas?.UsersAddr}</h3>
</div>

<div className='List1'>

<h3>{datas?.name}</h3>
<h3>{datas?.UsersAddr}</h3>


</div>


</div>


</div>

    
       
     )
    }else{
       // <Navigate to="/" replace={true} />
    }
    
}
