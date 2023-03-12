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
    // setWalletAddress(Accounts)
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
      if(checkUserExist(walletAddress) === true) {
        setUser(true)
        try{
            let provider = new ethers.providers.Web3Provider(window.ethereum);
            let signer =   provider.getSigner();
            // let signature = await signer.signMessage("");
            let  contract = new ethers.Contract(CA,  abi, signer);
            let walletAddress = await signer.getAddress();
          const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //    const Reg = await contract.createAccount(name)
           setGo(true)
           console.log(Reg)
      
          const tx =  {
          from: walletAddress,
          to: CA,
          gaslimit: 850000000000,
          gasprice: 50000000000,
  
          }
        }catch(err){
          console.log(err)
        }
    }else{
      console.log('error')
      setUser(true)
    }

  }
