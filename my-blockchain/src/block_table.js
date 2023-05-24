import React from 'react';

const BlockTable = ({ Block_details }) => {
    
  return (
    <table>
      <thead>
        <tr>
          <th>LastIrreversibleBlock</th>
          <th>Transaction number</th>
          {/* Add more table headers for each property */}
        </tr>
      </thead>
      <tbody>
        {Block_details.map((object,index) => (
          <tr key={index}>
            <td>{object.Number}</td>
            <td>{object.Withness}</td>
            <td>{object.Transactions}</td>
            {/* Render more table cells for each property */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlockTable;