import React, { useEffect, useState } from 'react';
import '../table.css'
const Witnesstable = () => {
    const [datavar,setdatavar] = useState()
    const [flag ,setflag] =useState(false)
   // const STEEM_100_PERCENT = 10000;
   // const STEEM_VOTE_REGENERATION_SECONDS = 5 * 24 * 60 * 60;
    const STEEM_INFLATION_RATE_START_PERCENT = 978;
    const STEEM_INFLATION_NARROWING_PERIOD = 250000;
    const STEEM_INFLATION_RATE_STOP_PERCENT = 95;
    const STEEM_BLOCKS_PER_YEAR = (365 * 24 * 60 * 60) / 3;
    const STEEM_BLOCKS_PER_DAY = (24 * 60 * 60) / 3;
   // const STEEM_SBD_START_PERCENT = 900;
   // const STEEM_SBD_STOP_PERCENT = 1000;
    const STEEM = 'STEEM';

    const fetchcur_inf =  (Blocknumber) => { 
      console.log(Blocknumber)
      var start_inflation_rate = STEEM_INFLATION_RATE_START_PERCENT;
      var inflation_rate_adjustment =
      Blocknumber / STEEM_INFLATION_NARROWING_PERIOD;
      
      var inflation_rate_floor = STEEM_INFLATION_RATE_STOP_PERCENT;
      var current_inflation_rate = Math.max(
        start_inflation_rate - inflation_rate_adjustment,
        inflation_rate_floor
      );
      return parseInt(current_inflation_rate);
    }

     useEffect(() => {
        const fetchData =  () => {         
                fetch('https://sds1.steemworld.org/steem_requests_api/condenser_api.get_dynamic_global_properties')
                .then(response => {
                   return response.json()
                 }).then(data =>{
                  const Stat = {
                    Headblknumber: data.result.head_block_number,
                    Current_Sbd_Supply: data.result.current_sbd_supply,
                    CurrentSuppy: data.result.current_supply,
                    VFSteem: data.result.total_vesting_fund_steem,
                    VFShare:data.result.total_vesting_shares,
                    Printrate:data.result.sbd_print_rate,
                    Interestrate:data.result.sbd_interest_rate,
                    Vsupply: data.result.virtual_supply,
                    Inflation: (fetchcur_inf(data.result.head_block_number) /100) ,
                    New_steem_per_day: (STEEM_BLOCKS_PER_DAY * parseFloat(data.result.virtual_supply) * ((fetchcur_inf(data.result.head_block_number)) / 10000) / (STEEM_BLOCKS_PER_YEAR ).toFixed(3)).toFixed(3) + ' ' + STEEM , 
                    //Inflation: fetchcur_inf(data.result.head_block_number) /100       
                  };
                    console.log(data.result)
                    fetchcur_inf(data.result.head_block_number)
                    //const gbprops = data.result
                    setdatavar(Stat);
                    setflag(true)
                    console.log(datavar)
                  
           
                 })    
                 .catch(e => console.error(e));
                         
        };
    
        fetchData();
        
        const fetchDataInterval = setInterval(fetchData, 3000); 

      return () => {
      clearInterval(fetchDataInterval); 
      };  
      }, []);

      return(
        <div>
          {flag &&
           <div>
           <h2>Market Stats</h2>
            <table className='tableGeneric' >
             <thead>
               <tr>
                 <th>Current Supply</th>
                 <th>Current SBD supply</th>
                 <th>Virtual steem</th>
                 <th>Steems Per Day</th>
                 <th>Annual Inflation Rate</th>
                 <th>Vesting Fund</th>
                 <th>Vesting Shares</th>
                 <th>Steems Per mVest</th>
                 <th>Print Rate</th>
                 <th>Interest Rate</th>
                 {/* Add more table headers for each property */}
               </tr>
             </thead>
             <tbody>
              
                 <tr >
                   <td>{datavar.CurrentSuppy}</td>
                   <td>{datavar.Current_Sbd_Supply}</td>
                   <td>{datavar.Vsupply}</td>
                   <td>{datavar.New_steem_per_day}</td>
                   <td>{datavar.Inflation} <span>%</span></td>                  
                   <td>{datavar.VFSteem}</td>
                   <td>{datavar.VFShare}</td>
                   <td>{(parseFloat(datavar.VFShare)/ parseFloat(datavar.VFSteem)).toFixed(3)}</td>
                   <td>{datavar.Printrate}</td>
                   <td>{datavar.Interestrate}</td>    
                   {/* Render more table cells for each property */}
                 </tr>
            
             </tbody>
           </table>
          </div>
           }
        </div>
        
      )
  
};

export default Witnesstable;