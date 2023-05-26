//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import BlockTable from './components/block_table';
import TransactionTable from './components/transaction_table';
import TextField from "@mui/material/TextField";
import AccountTable from './components/account';
import Blocksearch from './components/block_search';
function App() {
  const [BlockNumbers, setBlocknumbers] = useState([])
  const [Blockdetails, setBlockdetails] = useState([])
  const [Blockdetaildata , setBlockdetaildata] = useState()
  const [Searchtext , setSearchtext] = useState("")
  const [Searcheditem, setSearcheditem] = useState()
  const [type,settype]= useState('')
  const [ShowSearch ,setShowSearch] = useState(false)
  const [flag ,setflag] = useState(false)
  const [homepage,sethomepage] =useState(true)
  const [aboutpage,setaboutpage] =useState(false)
  const [communitypage,setcommunitypage] =useState(false)
  const [historypage,sethistorypage] =useState(false)
   
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
     settype('account')
     const ac_search = Searchtext.slice(1)
      fetch(`https://sds1.steemworld.org/accounts_api/getAccountsFields/name,created,reputation,count_active_posts,balance_steem,balance_sbd,vests_own,creator/${ac_search}`)
      .then(response => {
        return response.json()
      }).then(data =>{
        setSearcheditem(data.result);
        setShowSearch(true); 

      })    
      .catch(e => console.error(e));
    
    console.log(Searcheditem)
    }
    else if (firstLetter === '$'){
      // console.log("search is account type")
      // console.log(Searchtext)
      settype('block')
      const ac_search = Searchtext.slice(1)
       fetch(`https://sds1.steemworld.org/blocks_api/getBlock/${ac_search}`)
       .then(response => {
         return response.json()
       }).then(data =>{
        const BlockObject = {
          Number: ac_search,
          Withness: " ",
          Transactions: " ",
          Timestamp: " ",             
        };
              BlockObject.Timestamp =data.result.timestamp
              BlockObject.Withness = data.result.witness
              BlockObject.Transactions = data.result.transactions
         setSearcheditem(BlockObject);
         console.log(Searcheditem,BlockObject)
         setShowSearch(true); 
 
       })    
       .catch(e => console.error(e));
     
     console.log(Searcheditem)
     }
       
  };


  const handlehome =  () => {
    sethomepage(true)
    setaboutpage(false)
    setcommunitypage(false)
    sethistorypage(false)

  }

  const handleabout =  () => {
    sethomepage(false)
    setaboutpage(true)
    setcommunitypage(false)
    sethistorypage(false)
  }
  const handlecommunity =  () => {
    sethomepage(false)
    setaboutpage(false)
    setcommunitypage(true)
    sethistorypage(false)
  }
  const handlehistory =  () => {
    sethomepage(false)
    setaboutpage(false)
    setcommunitypage(false)
    sethistorypage(true)
  }

    
  return (
    <div>
      <header className='header'>
        <nav class="top-nav">
    <div class="nav-left">
      <button className='nav-btn' onClick={handlehome}>Home</button>
      <button className='nav-btn' onClick={handleabout}>About</button>
      <button className='nav-btn' onClick={handlecommunity}>CommunityReport</button>
      <button className='nav-btn' onClick={handlehistory}>ContentHistory</button>
    </div>
    <div class="nav-right">
    <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          InputProps={{
            style: {
              borderRadius: '4px',
              marginTop: '5px' ,
              padding: '6px 8px',
              width: '300px',
              height: '30px',
            },
          }}
          
          placeholder='@account/$blocknumber/Transactionid'
        />
        <button className='btn' onClick={handleSearch}>Search</button>
    </div>
   </nav>
          </header>
      {homepage &&
      <div className="App">
      <div className='searchblock'>
       <div className="search">
        
        
        {ShowSearch && type === "account" &&
           <AccountTable Account_details= {Searcheditem}></AccountTable>
        }
        {ShowSearch && type === "block" &&
           <Blocksearch Block_details= {Searcheditem}></Blocksearch>
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
    </div>}
    {aboutpage &&
     <div>About page</div>
     }
     {communitypage &&
     <div>Community page</div>
     }
     {historypage &&
     <div>content page</div>
     }

    </div>
  );
}

export default App;
