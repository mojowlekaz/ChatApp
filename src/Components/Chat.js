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
import { Navigate, NavLink, useParams } from 'react-router-dom';
import {abi, CA} from "./ContextAbi.js"
import {Link} from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {TbCopy} from "react-icons/tb"
import { BsEmojiSmile, BsFillSendFill} from "react-icons/bs"
import {AiOutlinePaperClip} from "react-icons/ai"



export default function Sidebar() {

useEffect( () => {
   getMyFtiends()
   readMessage()
   getUsername();

}, [])

const params = useParams();
console.log(params)
const ethers = require("ethers");
const [name , setName] = useState("")
const [result , setResult] = useState([""])
const [message , setMessage] = useState("")
const [click, setClick] = useState(false)
const [data, setData] = useState(null)
const [datas, setDatas] = useState("")
const [friendsname, setFriendsName] = useState("")
const {title} = useContext(Context);
const {walletAddress} = useContext(Context)
const {userName} = useContext(Context)

console.log(walletAddress)

async function ConvertTime(time) {
   const newTime = new Date(time.toNumber())
   const realTime = newTime.getHours() + 
    "/ " + 
   newTime.getMinutes() + 
   "/" + 
   newTime.getSeconds()  + 
   "/" + "Date: " +
   newTime.getDate() +
   "/" +
   (newTime.getMonth() + 1) +
   "/" +
   newTime.getFullYear();
   return (
      [realTime]
   )

}

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
 const timestamp = Date.now();

async function sendMessage() {
   try {
      
     let provider = new ethers.providers.Web3Provider(window.ethereum);
     let signer =   provider.getSigner();
     // let signature = await signer.signMessage("");
     let  contract = new ethers.Contract(CA,  abi, signer);
     let walletAddress = await signer.getAddress();
     
   const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const  user = await contract.sendMessage(params.id, message)
      setResult(user)
      //  setData(user)
      console.log(user)
      let test = new Date();
      // console.log(String.fromCharCode(0x640f7bec))


   
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

 async function readMessage() {
   try {
      
     let provider = new ethers.providers.Web3Provider(window.ethereum);
     let signer =   provider.getSigner();
     // let signature = await signer.signMessage("");
     let  contract = new ethers.Contract(CA,  abi, signer);
     let walletAddress = await signer.getAddress();
     
   const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const  user = await contract.readMessage(params.id)
      setResult(user)
      //  setData(user)
      // console.log(user)
      // console.log(String.fromCharCode(0x640f7bec))


   
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

 async function getUsername() {
   try {
      
     let provider = new ethers.providers.Web3Provider(window.ethereum);
     let signer =   provider.getSigner();
     // let signature = await signer.signMessage("");
     let  contract = new ethers.Contract(CA,  abi, signer);
     let walletAddress = await signer.getAddress();
     
   const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const  user = await contract.getUsername(params.id)
      setFriendsName(user)
      //  setData(user)
      // console.log(user)
      // console.log(String.fromCharCode(0x640f7bec))


   
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

<Typography variant="h6" color='#fff' component="body">Welcome, {userName} </Typography>
       
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
      
   <div className='chati'>


   {
   result.map( (res) => (
      <div  key={res.id}>  
      <div className='grid12'>
         <div className='List2'>
 
         {
   res.sender === params.id ?     
   <div>
      <Typography variant="h6" color='#0c1a13' style={{padding: "10px"}}  component="h6">  {friendsname}</Typography> 
      <h1 > {(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(res.timestamp))} </h1> 
        <Typography variant="h6" color='#fff'  component="body">  <small style={{color: "#fff"}}></small> {res.msg}</Typography>
      </div>
         : ""
}
            </div>           <br />
         </div>
         {
               console.log(ConvertTime(res.timestamp))
         }
         {/* <Typography variant="h6" color='#fff'  component="h6"> {test.toString()} </Typography>  */}
      
         {/* console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)); */}
         </div>
   ))

}


   {
   result?.map( (res) => (
      <div  key={res.id}>  
      <div className='grid11'>
         <div className='List2'>
{
   
   res.sender === params.id ?    "" : 
<div className='ga'>
<div>
<Typography variant="h5" color='#0c1a13'  style={{padding: "10px"}} component="h6">  {userName}</Typography>         
  <h1 > {(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(res.timestamp))} </h1> 
    <Typography variant="h6" color='#fff'  component="body">  <small style={{color: "#fff"}}></small> {res.msg}</Typography>  
   </div>
    </div> 
}

            </div>             <br />      <br />      <br />      <br /> <br />      <br />   <br /> <br />      <br />
         </div> <br />      <br />      <br />      <br />      <br />

         </div>
   ))
}


      {/* //// */}
   <div className='baseline'>

<BsEmojiSmile style={{fontSize: "40px", color:'#fff'}}  />

<input value={message} onChange={(e) => setMessage(e.target.value)}   className='inoputtrack12' type='text'  placeholder='Search for Your Friend '/> 
<AiOutlinePaperClip  style={{fontSize: "40px", color:'#fff'}} />
<button className='bttn1' onClick={sendMessage}> <BsFillSendFill  style={{fontSize: "30px", color:'#fff'}} /></button>
   </div>

   <div className='basel'>
      <div  className='program_title'>

      {/* <Typography variant="h5" color='#fff'  component="h6">  <small style={{color: "#fff"}}> {message}</small></Typography>  */}
      </div>
   </div>
   <div className='baseline2'>
      
      <div  className='program_title'>

      <Typography variant="h5" color='#fff'  component="h6">  <small style={{color: "#fff"}}> </small></Typography> 
      </div>
   </div>
   {/* {name} */}
   {

   }
         <Typography variant="h5" color='#fff'  component="h6">  <small style={{color: "#fff"}}> {  String.fromCharCode(0x6)}</small></Typography> 
   
      </div>
      
   </div>
{/* //////////////////////////////////////////////////////////////// */}
<input   className='inoputtrack11' type='text'  placeholder='Search for Your Friend '/> <br />
<div className='List'>
<Typography variant="h5" color='#fff'  component="h6">  <small style={{color: "#fff"}}>TOTAL FRIENDS: {data?.length}</small></Typography>  <br />
{
  data?.map((datas) => (
  

    <Link style={{textDecoration: "none"}} to={'/' + datas.addr } key={datas.id} >
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
