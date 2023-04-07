import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import Mainpage from './Components/Mainpage';
import {ChatProvider } from "/Users/macbook/chatapp/src/Components/Mainpage.js"

function App() {
  return (
    <div className="App">

      <Mainpage />
      {/* <Sidebar /> */}
        

    </div>
  );
}

export default App;



// {
//   data?.map((datas) => (


//     <Box key={datas.id } className='grid'>
// <div className='grid'>

//   <div className='List1'>
//   <h1>{datas.name}</h1>
//       {/* <h1>{datas.UsersAddr}</h1> */}
//   </div>
//       </div>

//       </Box>

//   ))
// }
