import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import '../community_report.css'
const Communitypage = () => {
    const [flag,setflag] = useState(false)
    const [serchtext,setsearchtext] = useState('')
    const [item,setitem] = useState()
    
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setflag(false)
        setsearchtext(lowerCase);
      };

    const handleSearch =  () => {       
          fetch(`https://sds1.steemworld.org/communities_api/getCommunity/${serchtext}`)
          .then(response => {
            return response.json()
          }).then(data =>{
            setitem(data.result);
            setflag(true); 
    
          })    
          .catch(e => console.error(e));
        
        console.log(item)
        
        
           
      };
    
  return (
    <div className='communityclass' >
        <div className='com-container' >
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          InputProps={{
            style: {
              borderRadius: '4px',
              marginTop: '10px' ,
              padding: '6px 8px',
              width: '360px',
              height: '30px',
            },
          }}
          label='Search'
          placeholder='hive-****'
        />
        <button className='btn-com' onClick={handleSearch}>Search</button>
        </div>



        {flag &&
        <div>
        <h2>Community Data</h2>
         <table className='tableGeneric' >
          <thead>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Account</th>
              <th>Title</th>
              <th>Rank</th>
              <th>Active Authors</th>
              <th>Subscribers</th>
              
              
              {/* Add more table headers for each property */}
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>{item.account}</td>
                <td>{item.title}</td>
                <td>{item.rank}</td>
                <td>{item.count_authors}</td>
                <td>{item.count_subs}</td>
                
    
                {/* Render more table cells for each property */}
              </tr>
          </tbody>
        </table>
       </div>

        }

    </div>
    

  );
};

export default Communitypage;