import React from 'react';
import '../table.css'
const BlockTable = ({ Block_details }) => {
  if(Block_details.length >20){
    Block_details =Block_details.slice(0,20)
  }
    
  return (
   <div >
    <h2 className='head'>Latest Block Details</h2>
     <table className='tableGeneric' >
      <thead>
        <tr>
          <th>Recent Blocks</th>
          <th>Witness</th>
          <th>Transaction Number</th>
          <th>Timestamp</th>
          {/* Add more table headers for each property */}
        </tr>
      </thead>
      <tbody>
        {Block_details.map((object,index) => (
          <tr key={index}>
            <td>{object.Number}</td>
            <td>{object.Withness}</td>
            <td>{object.Transactions.length}</td>
            <td>{object.Timestamp}</td>

            {/* Render more table cells for each property */}
          </tr>
        ))}
      </tbody>
    </table>
   </div>
  );
};

export default BlockTable;