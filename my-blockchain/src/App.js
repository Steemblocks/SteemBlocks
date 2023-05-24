//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import BlockTable from './block_table';

function App() {
  const [BlockNumbers, setBlocknumbers] = useState([])
  const [Blockdetails, setBlockdetails] = useState([])
  

  
  const [flag ,setflag] = useState(false)
  
  


  
  useEffect(() => {

 
      const fetchBlockNumber = () => {
        
        fetch("https://sds1.steemworld.org/blocks_api/getLastIrreversibleBlockNum")
          .then(response => {
            return response.json()
          })
          .then(data => {
            
           
            const BlockObject = {
              Number: data.result,
              Withness: 10,
              Transactions: 5,
              
            };
            
           
           
            
          if (Blockdetails.length >= 20)
          {

            const newblcknum = BlockNumbers.slice(0, -1);
            setBlocknumbers(newblcknum);

            const newblcdetail = Blockdetails.slice(0, -1);
            setBlockdetails(newblcdetail);
          }
            
          if (!BlockNumbers.includes(BlockObject.Number)) {
            
            let new1 = [BlockObject]
            new1= new1.concat(Blockdetails)
            setBlockdetails(new1)
            let new2 = [BlockObject.Number]
            new2 = new2.concat(BlockNumbers)
            setBlocknumbers(new2)
            
           console.log(Blockdetails)
           
          }
          

            setflag(true)     
          })
          .catch(e => console.error(e));
      }
      const fetchDataInterval = setInterval(fetchBlockNumber, 500); 

    return () => {
      clearInterval(fetchDataInterval); 
    }; 
 
     
  }, [Blockdetails,BlockNumbers])
  
  
  return (
    <div className="App">
      
      <div className='Above all'>
        <h1>Over all view</h1>
      </div>

      <div className='Block table'>
     { flag &&
      <BlockTable Block_details={Blockdetails}></BlockTable>
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
