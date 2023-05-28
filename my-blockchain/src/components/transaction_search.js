import React, { useState,useEffect } from 'react';
import '../table.css'
const TransactionSearchTable = ({ Block_Details }) => {
    const [Transaction, settransactions] = useState()
     
    
     useEffect(() => {
        settransactions(Block_Details)
       // console.log(Transaction)   
     },[Block_Details])

    const renderSwitch = (obj) => {
      switch(obj.Result.operations[0]?.[0]) {
         case 'vote':
           return obj.Result.operations[0]?.[1].voter;
         case 'comment':
           return obj.Result.operations[0]?.[1].author;
         case 'claim_account':
           return obj.Result.operations[0]?.[1].creator;
         case 'feed_publish':
           return obj.Result.operations[0]?.[1].publisher; 
         case 'claim_reward_balance':
           return obj.Result.operations[0]?.[1].account; 
         case 'transfer':
           return <span> <b>From:</b>{obj.Result.operations[0]?.[1].from}<b>To:</b>{obj.Result.operations[0]?.[1].to }</span>  ;      
         case 'transfer_to_vesting':
           return <span> <b>From:</b>{obj.Result.operations[0]?.[1].from} <b>To:</b>{obj.Result.operations[0]?.[1].to} </span>  ;      
         
         case 'custom_json':
           return obj.Result.operations[0]?.[1].required_posting_auths[0]  ;               
         default:
           return 'justty';
      }
    }
    
  return (
    <div>
      <h2>Latest Transactions</h2>
         <table className='tableGeneric'>
      <thead>
        <tr>
          <th>Transaction Id</th>
          <th>Block Number</th>
          <th>Operation</th>
          <th>Account</th>
          <th>Expiration</th>
          {/* Add more table headers for each property */}
       </tr>
       </thead>
        <tbody>
       { Transaction  && 
       
        <tr >
                <td>{Transaction.Id}</td>
                <td>{Transaction.Result.block_num}</td>
                <td>{Transaction.Result.operations[0]?.[0]}</td>
                <td>{renderSwitch(Transaction)}</td>
                <td>{Transaction.Result.expiration}</td>
                
        </tr>

       }

       
       </tbody> 
      
</table>
   
</div>

    
   );
};

export default TransactionSearchTable;