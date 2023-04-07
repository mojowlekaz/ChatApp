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
import { Navigate, NavLink } from 'react-router-dom';
import {abi, CA} from "./ContextAbi.js"
import {Link} from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {TbCopy} from "react-icons/tb"
import { BsEmojiSmile, BsFillSendFill} from "react-icons/bs"
import {AiOutlinePaperClip} from "react-icons/ai"



export default function Sidebar() {

useEffect( () => {
   getMyFtiends()
   sendMessage()
}, [])

const ethers = require("ethers");
const [name , setName] = useState("")
const [message , setMessage] = useState("")
const [click, setClick] = useState(false)
const [data, setData] = useState(null)
const [datas, setDatas] = useState("")
const {title} = useContext(Context);
const {walletAddress} = useContext(Context)
const {userName} = useContext(Context)
console.log(walletAddress)



async function getMyFtiends() {
   try {
     let provider = new ethers.providers.Web3Provider(window.ethereum);
     let signer =   provider.getSigner();
     // let signature = await signer.signMessage("");
     let  contract = new ethers.Contract(CA,  abi, signer);
     let walletAddress = await signer.getAddress();
     
   const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const user = await contract.getMyFtiends()
    setData(user)
   console.log(user)
   
   const tx =  {
   from: walletAddress,
   to: CA,
   gaslimit: 850000000000,
   gasprice: 50000000000,
   
   };
   console.log(tx);
   } catch (err) {
 
   //   setRegError(err)
   }
 }


async function sendMessage() {
   try {
      
     let provider = new ethers.providers.Web3Provider(window.ethereum);
     let signer =   provider.getSigner();
     // let signature = await signer.signMessage("");
     let  contract = new ethers.Contract(CA,  abi, signer);
     let walletAddress = await signer.getAddress();
     
   const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const  user = await contract.sendMessage( datas,name)
      setMessage(user)
      //  setData(user)
      console.log( datas.addr)


   
   const tx =  {
   from: walletAddress,
   to: CA,
   gaslimit: 850000000000,
   gasprice: 50000000000,
   
   };
   console.log(tx);
   } catch (err) {
 
   //   setRegError(err)
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
               <NavLink style={{textDecoration: "none"}} to="/chats" className='Link'><Typography variant="body"  color='#fff' component="body">  <RiMessage2Fill  style={{fontSize: "20px", color:'#ff'}} /> Chat </Typography></NavLink>
            </li>
           
            <li>
               <NavLink style={{textDecoration: "none"}} to="/allusers" className='Link'><Typography variant="body"  color='#fff' component="body">  <IoPersonAddSharp   style={{fontSize: "20px", color:'#ff'}} /> All Users</Typography></NavLink>
            </li>
           
            <li>
               <NavLink style={{textDecoration: "none"}} className='Link'><Typography variant="body"  color='#fff' component="body">  <MdSearch  style={{fontSize: "20px", color:'#ff'}}  /> Search</Typography></NavLink>
            </li>
           
            <li>
               <NavLink style={{textDecoration: "none"}} to="/add" className='Link'><Typography variant="body"  color='#fff' component="body">  <FaUserFriends  style={{fontSize: "20px", color:'#ff'}}  /> ADD friend</Typography></NavLink>
            </li>
            <li>
               <NavLink style={{textDecoration: "none"}} className='Link'><Typography variant="body"  color='#fff' component="body">  <MdDelete  style={{fontSize: "20px", color:'#ff'}}  /> Delete friend</Typography></NavLink>
            </li>
            </ul>

           </div> 

</div>



<div className="split right">

   <div className='chat'>
   <Typography variant="h5" color='#fff'  component="h6">  <small style={{color: "#fff"}}>  </small></Typography> 
   <div className='chati'>

      {/* //// */}
   <div className='baseline'>

<BsEmojiSmile style={{fontSize: "40px", color:'#fff'}}  />

<input value={name} onChange={(e) => setName(e.target.value)}   className='inoputtrack12' type='text'  placeholder='Search for Your Friend '/> 
<AiOutlinePaperClip  style={{fontSize: "40px", color:'#fff'}} />
<BsFillSendFill  style={{fontSize: "30px", color:'#fff'}} />
   </div>
   <div className='baseline1'>
      <div  className='program_title'>
      <Typography variant="h5" color='#fff'  component="h6">  <small style={{color: "#fff"}}> Hey, {userName} welcome to Web3chatApp. In other to start chatting you need to have a friend, please go to 
<NavLink style={{textDecoration: ""}} to="/allusers" className='Link'><Typography variant="body"  color='#0c1a13' component="body"> All Users</Typography></NavLink>
       to see available users to add after you have done that your friend(s) should appear at the left. you can then click on the friend you wish to chat with.<br /> <label style={{color: "#0c1a13"}}>Happy Chatting!!</label></small></Typography> 
      </div>
   </div>
   {/* {name} */}
      </div>
      
   </div>
{/* //////////////////////////////////////////////////////////////// */}
<input   className='inoputtrack11' type='text'  placeholder='Search for Your Friend '/> <br />
<div className='List'>
<Typography variant="h5" color='#fff'  component="h6">  <small style={{color: "#fff"}}>TOTAL FRIENDS: {data?.length}</small></Typography>  <br />
{
  data?.map((datas) => (
  

    <Link style={{textDecoration: "none"}} to={'/' + datas.addr} key={datas.id} >
<div   className='ava-space'>
<Avatar alt="Remy Sharp" className='avatar' style={{justifyContent: "center",  display: "flex"}}src={(require("/Users/macbook/chatapp/src/assets/Pixel-49.png"))} />
<div onClick={() => setDatas(datas.addr) } className='Frineds'>
<Typography variant="h5" color='#fff'  component="body">  <small style={{color: "#fff"}}></small> {datas.name}</Typography>  
<CopyToClipboard text={datas.addr}>
<Typography variant="body" color='#fff' component="h5">   {` ${datas.addr.substring(15,0)}.... ${datas.addr.substring(40)}`}
&nbsp; &nbsp; <button type='button' className='bttn' ><TbCopy /></button> </Typography>
</CopyToClipboard>

  </div>
  </div> <br />
  <hr style={{color: "#fff"}} /><br />
  </Link>



  ))
}

</div>

</div>

</div>

   
 )
}else{
   // <Navigate to="/" replace={true} />
}
}
