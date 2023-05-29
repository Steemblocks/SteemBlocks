import React, { useEffect, useState } from 'react';

function WitnessScedule() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
            id: "0", jsonrpc: "2.0", method: "call", params: ["condenser_api", "get_witness_schedule", []]
        };

        const response = await fetch('https://api.steemit.com', {
          method: 'POST', // Or 'GET', 'PUT', etc. depending on your API
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const jsonData = await response.json();
        console.log(jsonData.result.current_shuffled_witnesses)
        

        setData(jsonData.result.current_shuffled_witnesses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const fetchDataInterval = setInterval(fetchData, 3000); 

    return () => {
      clearInterval(fetchDataInterval); 
    };  
  }, []);

  return (
    <div>
      {data &&
      <div>
      <h2>Sceduled Witness</h2>
       <table className='tableGeneric' >
        <thead>
          <tr>
            <th>Witness Scedule List</th>
            
            {/* Add more table headers for each property */}
          </tr>
        </thead>
        <tbody>
          {data.map((object,index) => (
            <tr key={index}>
              <td>{object}</td>
              
  
              {/* Render more table cells for each property */}
            </tr>
          ))}
        </tbody>
      </table>
     </div>}
    </div>
  );
}

export default WitnessScedule;