import React, { useState,useEffect } from 'react';
import '../community_report.css'
const TransactionTable = ({ Block_Details }) => {
    const [Transactions, settransactions] = useState()
     
    
     useEffect(() => {
        settransactions(Block_Details)   
     },[Block_Details])

    const renderSwitch = (obj) => {
      switch(obj.operations[0]?.[0]) {
         case 'vote':
           return obj.operations[0]?.[1].voter;
         case 'comment':
           return obj.operations[0]?.[1].author;
         case 'claim_account':
           return obj.operations[0]?.[1].creator;
         case 'feed_publish':
           return obj.operations[0]?.[1].publisher; 
         case 'claim_reward_balance':
           return obj.operations[0]?.[1].account; 
         case 'transfer':
           return <span> <b>From:</b>{obj.operations[0]?.[1].from}<b>To:</b>{obj.operations[0]?.[1].to }</span>  ;      
         case 'transfer_to_vesting':
           return <span> <b>From:</b>{obj.operations[0]?.[1].from} <b>To:</b>{obj.operations[0]?.[1].to} </span>  ;      
         
         case 'custom_json':
           return obj.operations[0]?.[1].required_posting_auths[0]  ;               
         default:
           return 'justty';
      }
    }
    
  return (
    <>

    <div>
    <h2 className='trans-header'>Latest Transactions</h2>

         <table className='table'>
      <thead>
        <tr>
          <th>Transaction Id</th>
          <th>Operation</th>
          <th>Account</th>
          <th>Expiration</th>
          {/* Add more table headers for each property */}
       </tr>
       </thead>
        <tbody>
       { Transactions  && 
        Transactions.map((object,index) => (
        <tr key={index}>
                <td>{object.transaction_id}</td>
                <td>{object.operations[0]?.[0]}</td>
                <td>{renderSwitch(object)}</td>
                <td>{object.expiration}</td>
                
        </tr>

       ))}

       
       </tbody> 
      
</table>
   
</div>

</>

    
   );
};

export default TransactionTable;