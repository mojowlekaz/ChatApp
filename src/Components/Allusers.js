import { Avatar, Link, Typography } from '@mui/material'
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
import Card from './Card';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {TbCopy} from "react-icons/tb"

export default function Allusers() {

  useEffect( () => {
    FetchAllusers()
  }, [])
  
  const ethers = require("ethers");
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [copied, setCopied] = useState(false)
  const [address, setAddress] = useState("")
  const {title} = useContext(Context);
  const {walletAddress} = useContext(Context)
  const {userName} = useContext(Context)
  const [regerror, setRegError] = useState('')
  const [close, setClose] = useState(false)
  console.log(walletAddress)
    console.log(name)
  
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



 async function addFriend() {
  try {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer =   provider.getSigner();
    // let signature = await signer.signMessage("");
    let  contract = new ethers.Contract(CA,  abi, signer);
    let walletAddress = await signer.getAddress();
    
  const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
   const user = await contract.addFriend(address, name)
  //  setData(user)
  console.log(user)
  
  const tx =  {
  from: walletAddress,
  to: CA,
  gaslimit: 850000000000,
  gasprice: 50000000000,
  
  };
  console.log(tx);
  } catch (err) {

    setRegError(err)
  }
}
  if(walletAddress.length > 0 && userName.length > 0 ) {
    return (
    
    
       <div>
           
    <div className="split left">
    
    <Typography variant="h6" color='#fff' component="h6">Web3 chatApp</Typography><br />
    
    <Typography variant="h6" color='#fff' component="body">Welcome, {userName}</Typography>

           
               <div className='home'>
              
                   <ul>
                <li>
                   <NavLink to="chat" className='Link'><Typography variant="body"  color='#fff' component="body">  <RiMessage2Fill  style={{fontSize: "20px", color:'#ff'}} /> Chat </Typography></NavLink>
                </li>
               
                <li>
                   <NavLink className='Link'><Typography variant="body"  color='#fff' component="body">  <IoPersonAddSharp   style={{fontSize: "20px", color:'#ff'}} /> All Users</Typography></NavLink>
                </li>
               
                <li>
                   <NavLink className='Link'><Typography variant="body"  color='#fff' component="body">  <MdSearch  style={{fontSize: "20px", color:'#ff'}}  /> Search</Typography></NavLink>
                </li>
               
                <li>
                   <NavLink to="/add" className='Link'><Typography variant="body"  color='#fff' component="body">  <FaUserFriends  style={{fontSize: "20px", color:'#ff'}}  /> ADD friend</Typography></NavLink>
                </li>
                <li>
                   <NavLink className='Link'><Typography variant="body"  color='#fff' component="body">  <MdDelete  style={{fontSize: "20px", color:'#ff'}}  /> Delete friend</Typography></NavLink>
                </li>
                </ul>
    
               </div> 
               <Typography variant="h5" color='#fff' component="h6">Total User: {data.length}</Typography>
    
    </div>
    
    
    
    <div className="split right1">

    {/* <Typography variant="h5" color='#fff' style={{justifyContent: "center", display: "flex"}} component="h6">ALL USERS</Typography> <br /> */}


    {
  data.map((datas) => (
  

    <div key={datas.id} >
<div className='grid'>

<div className='List1'>
<Avatar alt="Remy Sharp" className='avatar' style={{justifyContent: "center",  display: "flex"}}src={(require("/Users/macbook/chatapp/src/assets/Pixel-49.png"))} />
<Typography variant="h5" color='#fff'  component="h6">  <small style={{color: "#fff"}}>Username:</small> {datas.name}</Typography>  <br />
<Typography variant="body" color='#fff' component="h5">  {` ${datas.UsersAddr.substring(15,0)}.... ${datas.UsersAddr.substring(40)}`}
&nbsp; &nbsp;<CopyToClipboard text={datas.UsersAddr}>
<button type='button' className='bttn' onClick={() => {
  setCopied(true)
  setClose(true)
  }}><TbCopy /></button> 
</CopyToClipboard>
</Typography> <br />


<input  onChange={(e) => setName(e.target.value)}  className='inoputtrack111' type='text' value={name}  placeholder='Name Of  Your Friend '/> <br />
<input  onChange={(e) => setAddress(e.target.value)}  className='inoputtrack111' type='text'  value={address} placeholder='Address Of  Your Friend '/> <br />
<button onClick={addFriend}>Add Frined</button>
{close ? <div className='popp'>copied!
<br />
<button className='bttn' onClick={() => setClose(false) }>X</button>
</div>: ""}  
{regerror ? <div className='popp'>Error
<button className='bttn' onClick={() => setOpen(true) }>X</button>
</div> : ""}

{/* {close ? <button onClick={() => setClose(false) }>YYY</button>: ""}   */}
  </div>
  </div>

      </div>

  ))
}

    </div>
       </div>
    
       
     )
    }else{
       // <Navigate to="/" replace={true} />
    }
    
}
