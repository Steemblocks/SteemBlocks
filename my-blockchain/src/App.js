//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import BlockTable from './block_table';
import TransactionTable from './transaction_table';
import TextField from "@mui/material/TextField";
import AccountTable from './account';
function App() {
  const [BlockNumbers, setBlocknumbers] = useState([])
  const [Blockdetails, setBlockdetails] = useState([])
  const [Blockdetaildata , setBlockdetaildata] = useState()
  const [Searchtext , setSearchtext] = useState("")
  const [Searcheditem, setSearcheditem] = useState()
  const [ShowSearch ,setShowSearch] = useState(false)
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
            
          if (!BlockNumbers.includes(BlockObject.Number)) { 
            let new1 = [BlockObject]
            new1= new1.concat(Blockdetails)
            setBlockdetails(new1)

            let new2 = [BlockObject.Number]
            new2 = new2.concat(BlockNumbers)
            setBlocknumbers(new2)
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


  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setShowSearch(false)
    setSearchtext(lowerCase);
  };
  const handleSearch =  () => {
    const firstLetter = Searchtext.charAt(0); 
    if (firstLetter === '@'){
     // console.log("search is account type")
     // console.log(Searchtext)
     const ac_search = Searchtext.slice(1)
      fetch(`https://sds1.steemworld.org/accounts_api/getAccount/${ac_search}`)
      .then(response => {
        return response.json()
      }).then(data =>{
        setSearcheditem(data.result);
        setShowSearch(true); 

      })    
      .catch(e => console.error(e));
    
    console.log(Searcheditem)
    }
       
  };
    
  return (
    <div className="App">
      <div className='searchblock'>
       <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
          placeholder='@account/$blocknumber/Transactionid'
        />
        <button className='btn' onClick={handleSearch}>Search</button>
        {ShowSearch && 
           <AccountTable Account_details= {Searcheditem}></AccountTable>
        }

       </div>
    </div>
      <div className='blockandtransaction'>
      <div className='Block table'>
     { flag &&
      <BlockTable Block_details={Blockdetails}></BlockTable>
     }
      </div>

      <div className='Transactions table'>
     { flag &&
        <TransactionTable Block_Details={Blockdetaildata.result.transactions}></TransactionTable>
      }    

      </div>
      </div>
      <div className='Scedule'>
        <h1>Scedule</h1>
      </div>
      
    </div>
  );
}

export default App;
