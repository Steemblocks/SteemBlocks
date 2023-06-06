import React from 'react';
import '../table.css'
const AccountTable = ({ Account_details }) => {
    console.log(Account_details.rows[0])
    
  return (
    
    
   <div className='scrollbar'>
   <h2>Account Information</h2>
    
     <table className='tableGeneric' >
      <thead>
        <tr>
          <th>AccountName</th>
          <th>Reputation</th>
          <th>Count_active_posts</th>
          <th>Balance_steem</th>
          <th>Balance_sbd</th>
          <th>Vests_own</th>
          <th>Creator</th>
          {/* Add more table headers for each property */}
        </tr>
      </thead>
      <tbody>
       
          <tr >
            <td>{Account_details.rows[0]?.[0]}</td>
            <td>{Account_details.rows[0]?.[2]}</td>
            <td>{Account_details.rows[0]?.[3]}</td>
            <td>{Account_details.rows[0]?.[4]}</td>
            <td>{Account_details.rows[0]?.[5]}</td>
            <td>{Account_details.rows[0]?.[6]}</td>
            <td>{Account_details.rows[0]?.[7]}</td>
           

            {/* Render more table cells for each property */}
          </tr>
        
      </tbody>
    </table>
   </div>
  
  );
};

export default AccountTable;