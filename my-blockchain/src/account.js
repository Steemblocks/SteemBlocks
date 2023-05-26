import React from 'react';
import './table.css'
const AccountTable = ({ Account_details }) => {
    
  return (
   <div>
    <h2>Latest Block Details</h2>
     <table className='tableGeneric' >
      <thead>
        <tr>
          <th>AccountName</th>
          <th>Balance</th>
          <th>Curation Reward</th>
          <th>Voting Power</th>
          <th>Withness votes</th>
          {/* Add more table headers for each property */}
        </tr>
      </thead>
      <tbody>
       
          <tr >
            <td>{Account_details.name}</td>
            <td>{Account_details.balance}</td>
            <td>{Account_details.curation_rewards}</td>
            <td>{Account_details.voting_power}</td>
            <td>{Account_details.witness_votes.length}</td>

            {/* Render more table cells for each property */}
          </tr>
        
      </tbody>
    </table>
   </div>
  );
};

export default AccountTable;