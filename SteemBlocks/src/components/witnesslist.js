import React, { useEffect, useState } from 'react';
import '../table.css'
const Witnesstable = () => {
    const [datavar,setdatavar] = useState()
    const [flag ,setflag] =useState(false)
    

     useEffect(() => {
        const fetchData =  () => {         
                fetch('https://sds1.steemworld.org/witnesses_api/getWitnessesByRank')
                .then(response => {
                   return response.json()
                 }).then(data =>{
                    console.log(data.result.rows)
                    const witnessarr = data.result.rows
                    setdatavar(witnessarr);
                    setflag(true)
                  
           
                 })    
                 .catch(e => console.error(e));
                         
        };
    
        fetchData();
        console.log(datavar)
      }, []);

      return(
        <div>
            {flag &&
            <div>
            <h2>Witness List</h2>
             <table className='tableGenericwithness' >
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Witness Name</th>
                  <th>Received Votes</th>
                  <th>Hard Fork Version</th>
                  <th>Running Version</th>                  
                  <th>Produced Blocks</th>
                  <th>Missed Blocks</th>
                  <th>Price feed</th>                
                  <th>Last Confirmed Block</th>
                  <th>Account Subsidies</th>
                  <th>witness thread</th>
                  {/* Add more table headers for each property */}
                </tr>
              </thead>
              <tbody>
                 {datavar.map((object,index) => ( 
                  <tr key={index}>
                    <td>{object[1]}</td>
                    <td> <a href={'https://steemit.com/@' + object[0]} target='_blank'>{object[0]}</a></td>
                    <td>{(object[5]/1000000046373.045).toFixed(2)}</td>
                    <td>{object[9]}</td>
                    <td>{object[8]}</td>
                    <td>{object[6]}</td>
                    <td>{object[7]}</td>
                    <td><span>{object[17].base}</span> <span><b>/</b>{object[17].quote}</span></td>
                    <td>{object[11]}</td>
                    <td>{object[13]}</td>
                    <td><a href={object[15]}>click here</a></td>
        
                    {/* Render more table cells for each property */}
                  </tr>
                 ))} 
              </tbody>
            </table>
           </div>}
        </div>
        
      )
  
};

export default Witnesstable;
