import React, { useState,useEffect } from 'react';
import './table.css'
const TransactionTable = ({ Block_Details }) => {
    const [Transactions, settransactions] = useState()
     
    
     useEffect(() => {
        settransactions(Block_Details)

    //     if(Block_Details.length>0){
    //         for (let i=0;i< Block_Details.length;i++)
    //         {
                
    //          let new2 = Block_Details[i].Transactions
    //         new2 = new2.concat(Transactions)
           
    //         settransactions(new2)

    //         }
            
    //     }
    //     console.log(Transactions)

     },[Block_Details])

    
     
   // settransactions(Block_Details[i].result.transactions)
//<td>{object.operations[0]?.[1].voter}</td>
               // 
    
  return (
    <div>
      <h2>Last Transactions</h2>
         <table className='tableGeneric'>
      <thead>
        <tr>
          <th>Transaction Id</th>
          <th>Operation</th>
          <th>Voter</th>
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
                {object.operations[0]?.[0] === "vote" &&
                 <td>{object.operations[0]?.[1].voter}</td>
                }
                {object.operations[0]?.[0] === "comment" &&
                 <td>{object.operations[0]?.[1].author}</td>
                }
                {object.operations[0]?.[0] === "claim_account" &&
                 <td>{object.operations[0]?.[1].creator}</td>
                }
                {object.operations[0]?.[0] === "feed_publish" &&
                 <td>{object.operations[0]?.[1].publisher}</td>
                }
                {object.operations[0]?.[0] === "claim_reward_balance" &&
                 <td>{object.operations[0]?.[1].account}</td>
                }
                {object.operations[0]?.[0] === "transfer" &&
                 <td><span> <b>From:</b> </span>{object.operations[0]?.[1].from} <span> <b>To:</b> {object.operations[0]?.[1].to}</span> </td>
                }
                {object.operations[0]?.[0] === "transfer_to_vesting" &&
                 <td><span> <b>From:</b> </span>{object.operations[0]?.[1].from} <span> <b>To:</b> {object.operations[0]?.[1].to}</span> </td>
                }
                {object.operations[0]?.[0] === "custom_json" &&
                 <td>{object.operations[0]?.[1].required_posting_auths[0]}</td>
                }
                <td>{object.expiration}</td>
                
        </tr>

       ))}

       
       </tbody> 
      
</table>
   
</div>


//      
//         {Block_Details.map((object,index) => (
//             object.Transactions.map((object2,index) => (
//                 <tr key={index}>
            
            
//             <td>{object2.transaction_id}</td>
//             <td>{object2.expiration}</td> 

//             {/* Render more table cells for each property */}
//           </tr>
//             ))
          
//         ))}
//       
//     
   );
};

export default TransactionTable;