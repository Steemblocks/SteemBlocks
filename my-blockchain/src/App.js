//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import BlockTable from './block_table';
import TransactionTable from './transaction_table';

function App() {
  const [BlockNumbers, setBlocknumbers] = useState([])
  const [Blockdetails, setBlockdetails] = useState([])
  //const [Blocktransactions,setBlocktransactions] = useState([])
  const [Blockdetaildata , setBlockdetaildata] = useState()
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
              Withness: " ",
              Transactions: " ",
              Timestamp: " ",             
            };
            


            fetch(`https://sds1.steemworld.org/blocks_api/getBlock/${data.result}`)
            .then(response => {
             return response.json()             
            }).then(data =>{
              setBlockdetaildata(data)
              BlockObject.Timestamp =data.result.timestamp
              BlockObject.Withness = data.result.witness
              BlockObject.Transactions = data.result.transactions

            })    
            .catch(e => console.error(e));
           
                 
          if (BlockNumbers.length >= 20)
          {
            const newblcknum = BlockNumbers.slice(0, -1);
            setBlocknumbers(newblcknum);            
          }

          if (Blockdetails.length >= 20)
          {
            const newblcdetail = Blockdetails.slice(0, -1);
            setBlockdetails(newblcdetail);           
          }

          // if(Blocktransactions.length >= 20)
          // {
          //   let a = 20 - Blocktransactions.length
          //   console.log(a)
          //   const newblcktrans = Blocktransactions.slice(0,a)
          //   setBlocktransactions(newblcktrans)
          // }


          
            
          if (!BlockNumbers.includes(BlockObject.Number)) { 
            let new1 = [BlockObject]
            new1= new1.concat(Blockdetails)
            setBlockdetails(new1)

            let new2 = [BlockObject.Number]
            new2 = new2.concat(BlockNumbers)
            setBlocknumbers(new2)

           // let new3 = [...BlockObject.Transactions,...Blocktransactions]
           // new3 = new3.concat(Blocktransactions)
           // setBlocktransactions(Blockdetaildata.result.transactions)
             console.log(Blockdetaildata.result.transactions)
            // console.log(Blocktransactions) 
            //console.log(Blockdetails)          
          }
            setflag(true)     
          })
          .catch(e => console.error(e));
      }
      const fetchDataInterval = setInterval(fetchBlockNumber, 500); 

    return () => {
      clearInterval(fetchDataInterval); 
    }; 
 
     
  }, [Blockdetails,BlockNumbers,Blockdetaildata])
  
  
  return (
    <div className="App">
      
      <div className='Above all'>
        <h1>Over all view</h1>
      </div>

      <div className='Block table'>
     { flag &&
     
      <BlockTable Block_details={Blockdetails}></BlockTable>
     // <TransactionTable Block_Transactions={}></TransactionTable>
     }
      </div>

      <div className='Transactions table'>
     { flag &&
        <TransactionTable Block_Details={Blockdetaildata.result.transactions}></TransactionTable>
      }    

      </div>
      <div className='Scedule'>
        <h1>Scedule</h1>
      </div>
      
    </div>
  );
}

export default App;
