//import logo from './logo.svg';
import './App.css';
import {BiHomeAlt2} from "react-icons/bi";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {MdOutlineHistory} from "react-icons/md";
import {FaRegRectangleList} from "react-icons/fa6";
import {ImTable2} from "react-icons/im";
import React, { useEffect, useState,useRef } from 'react'
import BlockTable from './components/block_table';
import TransactionTable from './components/transaction_table';
import TextField from "@mui/material/TextField";
import AccountTable from './components/account';
import Blocksearch from './components/block_search';
import Aboutpage from './components/about';
import Communitypage from './components/community_report';
import Witnesstable from './components/witnesslist';
import Contenthistory from './components/contenthistory';
import TransactionSearchTable from './components/transaction_search';
import Steemstat from './components/steemstat';
import WitnessScedule from './components/withnesss_scedule';
import LoadingPage from './components/loadingpage';
import { formHelperTextClasses } from '@mui/material';
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
  const [withnesspage,setwithnesspage] =useState(false)
  const [Searchfailedflag,setsearchfailedflag] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [showmobilenav,setshowmobilenav] = useState(false)
  const [Blkfetchvalue,setBlkfetchvalue] = useState(false)
  const GlobalValueofBlk = useRef(0);
  useEffect(() => {
    //var GlobalValueofBlk = 0
      const fetchBlockNumber = () => {       
        fetch("https://sds1.steemworld.org/blocks_api/getLastIrreversibleBlockNum")
          .then(response => {
            return response.json()
          })
          .then(data => {
            if(Blkfetchvalue){
            }else{
              setBlkfetchvalue(true)
              GlobalValueofBlk.current = data.result
            }

            console.log(GlobalValueofBlk)
            const BlockObject = {
              Number: GlobalValueofBlk.current,
              Withness: " ",
              Transactions: " ",
              Timestamp: " ",             
            };
            fetch(`https://sds1.steemworld.org/blocks_api/getBlock/${GlobalValueofBlk.current - 25}`)
            .then(response => {
             return response.json()             
            }).then(data =>{
              if(data.code === -1){ 
              }else{
                GlobalValueofBlk.current++
              }
              console.log(data)
              setBlockdetaildata(data)
              BlockObject.Timestamp = data.result.timestamp
              BlockObject.Withness = data.result.witness
              BlockObject.Transactions = data.result.transactions

            })    
            .catch(e => console.error(e));
           
                 
          // if (BlockNumbers.length >= 20)
          // {
          //   const newblcknum = BlockNumbers.slice(0, -1);
          //   setBlocknumbers(newblcknum);            
          // }

          if (Blockdetails.length >= 20)
          {
            const newblcdetail = Blockdetails.slice(0, -1);
            setBlockdetails(newblcdetail);           
          }
            let new1 = [BlockObject]
            new1= new1.concat(Blockdetails)
            setBlockdetails(new1)

            // let new2 = [BlockObject.Number]
            // new2 = new2.concat(BlockNumbers)
            // setBlocknumbers(new2)
             console.log(Blockdetaildata.result.transactions)
            // console.log(Blocktransactions) 
            //console.log(Blockdetails)          
          
            setflag(true)     
          })
          .catch(e => console.error(e));
      }
      const fetchDataInterval = setInterval(fetchBlockNumber, 3000); 

    return () => {
      clearInterval(fetchDataInterval); 
    };  
    
    
  }, [Blockdetails,Blockdetaildata,Blkfetchvalue])


  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setShowSearch(false)
    setsearchfailedflag(false)
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
        if(!data.result){
          setSearcheditem(null);
        }else{
          setSearcheditem(data.result);    
        }
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
          Number: " ",
          Withness: " ",
          Transactions: " ",
          Timestamp: " ",             
        };
              
              BlockObject.Timestamp =data.result.timestamp
              BlockObject.Withness = data.result.witness
              BlockObject.Transactions = data.result.transactions
        // setSearcheditem(BlockObject);
         console.log(Searcheditem,BlockObject)
         //setShowSearch(true); 
         if(!data.result){
          setSearcheditem(null);
        }else{
          BlockObject.Number = ac_search
          setSearcheditem(BlockObject);
          

        }
        setShowSearch(true); 
 
       })    
       .catch(e => console.error(e));
     
     console.log(Searcheditem)
     }

     else{
      settype('transaction')
      const ac_search = Searchtext
       fetch(`https://sds1.steemworld.org/transactions_api/getTransactionById/${ac_search}`)
       .then(response => {
         return response.json()
       }).then(data =>{
        const TransactionObject = {
          Id: ac_search,          
          Result: " ",                      
        };
         TransactionObject.Result = data.result
        if(!data.result){
          setSearcheditem(null);
        }else{
          setSearcheditem(TransactionObject);
          
        }
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
    setwithnesspage(false)
    setshowmobilenav(false)

  }

  const handleabout =  () => {
    sethomepage(false)
    setaboutpage(true)
    setcommunitypage(false)
    sethistorypage(false)
    setwithnesspage(false)
    setshowmobilenav(false)
  }
  const handlecommunity =  () => {
    sethomepage(false)
    setaboutpage(false)
    setcommunitypage(true)
    sethistorypage(false)
    setwithnesspage(false)
    setshowmobilenav(false)
  }
  const handlehistory =  () => {
    sethomepage(false)
    setaboutpage(false)
    setcommunitypage(false)
    sethistorypage(true)
    setwithnesspage(false)
    setshowmobilenav(false)
  }

  const handlewitness =  () => {
    sethomepage(false)
    setaboutpage(false)
    setcommunitypage(false)
    sethistorypage(false)
    setwithnesspage(true)
    setshowmobilenav(false)
  }

  const handleMobileNav = ()=>{
    setshowmobilenav(!showmobilenav)
  }



  useEffect(() => {
    // Simulate a delay before hiding the loading page
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
    
  return (
    <>
    {isLoading? <LoadingPage/>:
    <div>
    <header className='header'>
    

    <nav className="top-nav">
  <div className="mobile-drawer">
   <button  className='nav-btn' onClick={handleMobileNav}><div className='dashcontainer'><div className='dash'></div><div className='dash'></div><div className='dash'></div></div></button>
  </div>
  <div className="nav-left">
    <button className='nav-btn' onClick={handlehome}>Home</button>
    <button className='nav-btn' onClick={handleabout}>About</button>
    <button className='nav-btn' onClick={handlecommunity}>Community Data</button>
    <button className='nav-btn' onClick={handlehistory}>Content History</button>
    <button className='nav-btn' onClick={handlewitness}>Witness List</button>
  </div>

  { showmobilenav &&
  <div className='mobile-nav-drawer'>
  <button className='nav-btn' onClick={handlehome}><BiHomeAlt2/> <span>Home</span></button>
  <button className='nav-btn' onClick={handleabout}><AiOutlineQuestionCircle/><span>About</span></button>
  <button className='nav-btn' onClick={handlecommunity}><ImTable2/><span>Community Data</span></button>
  <button className='nav-btn' onClick={handlehistory}><MdOutlineHistory/><span>Content History</span></button>
  <button className='nav-btn' onClick={handlewitness}><FaRegRectangleList/><span>Witness List</span></button>
</div>

  }
  {!aboutpage && !communitypage && !historypage && !withnesspage &&
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
  </div>}
 </nav>
        </header>
    {homepage &&
    <div className="App">
    <div className='searchblock'>
     <div className="search">
      
     {ShowSearch && !Searcheditem &&
      <div><h2>No search data available to show <br /> <b>Do check you have given correct input</b></h2></div>
      }
      {ShowSearch && type === "account" && Searcheditem &&
         <AccountTable Account_details= {Searcheditem}></AccountTable>
      }
      {ShowSearch && type === "block" && Searcheditem &&
         <Blocksearch Block_details= {Searcheditem}></Blocksearch>
      }
      {ShowSearch && type === "transaction" && Searcheditem &&
          <TransactionSearchTable Block_Details={Searcheditem}></TransactionSearchTable>
      }
      

     </div>
  </div>
    <div className='blockandtransaction'>
      <div className='Mstat'>
      {flag &&
      <Steemstat></Steemstat>}
      </div>
     
  
    
    <div className='Block-table'>
   { flag && 
    <div className='Block-Withness'>
      <BlockTable className='component' Block_details={Blockdetails}></BlockTable>
      
    </div>
    
   }
    </div>

    <div className='Block-table'>
   { flag && 
    <div className='Block-Withnessscedule'>
      <WitnessScedule className='component'></WitnessScedule>
    </div>
    
   }
    </div>

    </div> 
    <div className='Transactions-table'>
   { flag &&
      <TransactionTable  Block_Details={Blockdetaildata.result.transactions}></TransactionTable>
    }    
    </div>    
  </div>}
  {aboutpage &&
   <Aboutpage/>
   }
   {communitypage &&
   <Communitypage/>
   }
   {historypage &&
   <Contenthistory/>
   }
   {withnesspage &&
   <Witnesstable/>
   }

 <footer className='footer'>
  <p>&copy; 2023 <a href="https://steemit.com/@dhaka.witness" target='_blank'>@Dhaka.witness</a>. All rights reserved.</p>
 </footer>

  </div>}
    </>
  );
}

export default App;
