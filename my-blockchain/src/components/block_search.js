import React from 'react';
import '../table.css'
const Blocksearch = ({ Block_details }) => {
    
  return (
   <div>
    <h2>Latest Block Details</h2>
     <table className='tableGeneric' >
      <thead>
        <tr>
          <th>LastIrreversibleBlock</th>
          <th>Witness</th>
          <th>TransactionNumber</th>
          <th>Timestamp</th>
          {/* Add more table headers for each property */}
        </tr>
      </thead>
      <tbody>
       
          <tr >
            <td>{Block_details.Number}</td>
            <td>{Block_details.Withness}</td>
            <td>{Block_details.Transactions.length}</td>
            <td>{Block_details.Timestamp}</td>

            {/* Render more table cells for each property */}
          </tr>
        
      </tbody>
    </table>
   </div>
  );
};

export default Blocksearch;