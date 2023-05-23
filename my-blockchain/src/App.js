//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  const [BlockNumbers, setBlocknumbers] = useState()
  const [flag ,setflag] = useState(false)
  
  useEffect(() => {

 
      const fetchUserData = () => {
        fetch("https://sds1.steemworld.org/blocks_api/getLastIrreversibleBlockNum")
          .then(response => {
            return response.json()
          })
          .then(data => {
             
            setBlocknumbers(data)
            setflag(true)       
          })
          .catch(e => console.error(e));
      }
      fetchUserData() 
 
     
  }, [])
  //console.log(BlockNumbers)
  
  return (
    <div className="App">
      
      <div className='Above all'>
        <h1>Over all view</h1>
      </div>

      <div className='Block table'>
     { flag &&
      <h1>{BlockNumbers.result}</h1>
     }
      </div>

      <div className='Transactions table'>
        <h1>Blocks table </h1>

      </div>
      <div className='Scedule'>
        <h1>Scedule</h1>
      </div>
      
    </div>
  );
}

export default App;
