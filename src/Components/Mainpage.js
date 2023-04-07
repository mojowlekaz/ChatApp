import React, {useEffect, createContext , useState} from 'react';
import { Typography } from '@mui/material'
import "/Users/macbook/chatapp/src/Styles/Mainpage.css"
import { Navigate } from 'react-router-dom';
import {abi, CA} from "./ContextAbi.js"
import Sidebar from './Sidebar.js';
import {Link} from "react-router-dom";
export const Context = createContext();


export const ChatProvider = ({children}) => {
  const title = "Welvome Usecontext"
  return(
    <Context.Provider value={{title}}>
      {children}
    </Context.Provider>
  )
}
export default function Mainpage({children}) {
  const title = "heu"


  const ethers = require("ethers");
  const [email, setEmail] = useState('')
  const [data, setData] = useState(null)
  const [post, setPost] = useState('')
  const [name , setName] = useState("")
  const [error, setError] = useState('')
  const [walletAddress, setWalletAddress] = useState("")
  const [open, setOpen] = useState(false)
  const [go, setGo] = useState(false)
  const [ShowComponent, setShowComponent] = useState(false)
  const [close, setClose] = useState(false)
  const [user, setUser] = useState(false)
  const [regerror, setRegError] = useState('')
  const [userName, setUserName] = useState(false)

  useEffect( () => {
    const set = ( () => {
      setClose(true)
    })
    setTimeout(() => {
      setShowComponent(true);
  } , 1000)
      connect();
      getUsername() 
      checkUserExist()
      set()
  }, [])


  async function getUsername() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer =   provider.getSigner();
    // let signature = await signer.signMessage("");
    let  contract = new ethers.Contract(CA,  abi, signer);
    let walletAddress = await signer.getAddress();
    
  const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
   const user = await contract.getUsername(walletAddress)
   setUserName(user)

  const tx =  {
  from: walletAddress,
  to: CA,
  gaslimit: 850000000000,
  gasprice: 50000000000,

};
console.log(tx);
 }
 
  async function connect(){
    if (typeof window.ethereum !== 'undefined') 
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum)            
    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
    const message = "Verify Your Identity"
    // let signedMessage = await signer.signMessage (message);
    // const signerAddr = await ethers.utils.verifyMessage(message, signedMessage)
    // setIsSignature(signerAddr)
    console.log("Accounts address:", await signer.getAddress());
    let Accounts = await signer.getAddress();
    // setSignature(signature)
    setWalletAddress(Accounts)
    // setSigned(true)
      } 
      catch(err){
       
      }
      else {
      }
 
    } 


       async function checkUserExist() {
          let provider = new ethers.providers.Web3Provider(window.ethereum);
          let signer =   provider.getSigner();
          // let signature = await signer.signMessage("");
          let  contract = new ethers.Contract(CA,  abi, signer);
          let walletAddress = await signer.getAddress();
          
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
         const user = await contract.checkUserExist(walletAddress)
         console.log(user)
    
        const tx =  {
        from: walletAddress,
        to: CA,
        gaslimit: 850000000000,
        gasprice: 50000000000,
     
      };
     console.log(tx);
       }

    async function Register(){
      try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer =   provider.getSigner();
        // let signature = await signer.signMessage("");
        let  contract = new ethers.Contract(CA,  abi, signer);
        let walletAddress = await signer.getAddress();
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
       const Reg = await contract.createAccount(name)
       setGo(true)
       console.log(Reg)
  
      const tx =  {
      from: walletAddress,
      to: CA,
      gaslimit: 850000000000,
      gasprice: 50000000000,

      }
      } catch (errr) {
        setRegError(errr)
        
      }

  }



  return (
    
    <Context.Provider value={{title, walletAddress, userName}}>  
{
  ShowComponent === true ?         <div className='pop'>
  <Typography variant='body' component="body" color="#ff">
 The dApp is deployed on Test Network, Please Connect to the Goerli ETH Network to have a full test of the dapp.<br />
<Link to={"https://chainlist.org/chain/5"}>Check here to it Setup </Link> <br />
 <button className='bttn' onClick={() => setShowComponent(false)}>X</button>
    </Typography> 

  </div>  : ""
}
          {/* {children} */}
    <div className=''>

<div className='form'>
  {children}
    {open  && <div className='pop'>
      <Typography variant=' body1' component="h3" >
     Oops!!  Name can not be empty. <br />
     <button className='bttn' onClick={() => setOpen(false)}>X</button>
        </Typography> 

      </div>
}

  {
    regerror  && <div className='pop'>
    <Typography variant=' body1' component="h3" >
    error <br />
   <button className='bttn' onClick={() => setClose(false)}>X</button>
      </Typography> 

    </div> 
  }



      <div className='navv'>
 <Typography variant="h3" color='#fff' component="h3">Web3 chatApp</Typography>
      </div>  <br />
<form>
                <div className='inputalign'>
                <span >Name:  {`Hi  ${name} `}</span>
               <input value={name} onChange={(e) => setName(e.target.value)} className='inoputtrack' type='text'  required placeholder='Enter Your  Name'/> 
               </div> <br />

            <div className='inputalign'>
                <span>Address:  &nbsp; </span>
               <input value={walletAddress}  className='inoputtrack' type='text'   placeholder='Enter Your Wallet Address '/>
               </div> <br />

               </form> 
                {
                  name.length > 3 ?   <button onClick={Register}><Typography variant=' body1' component="h3" >Create an Account</Typography> </button> :    
               ""
                }
{
    walletAddress.length > 0 && userName.length > 0 ? 
      <Link to={"/chat"}><button ><Typography variant=' body1' component="h3" > Login</Typography> </button> </Link> : ""
    
}
               </div>
               {
                 go  ? <Navigate to="/chat" replace={true} />: ""
               }
    </div>
    </Context.Provider>
  )
}

