import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import '../community_report.css'
const Contenthistory = () => {
    const [flag,setflag] = useState(false)
    const [serchtext,setsearchtext] = useState('')
    const [item,setitem] = useState()
    
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setflag(false)
        setsearchtext(lowerCase);
      };

    const handleSearch =  () => {
        const dividedString = serchtext.split('/');
        const lengthstring = dividedString.length
        const account_raw = dividedString[lengthstring-2]
        const account =  account_raw.slice(1)
        const linkid = dividedString[lengthstring-1]
        console.log(account,linkid)       
          fetch(`https://sds1.steemworld.org/content_history_api/getContentHistory/${account}/${linkid}`)
          .then(response => {
            return response.json()
          }).then(data =>{
           // console.log(data.result.rows)
            //setitem(data.result.rows);
           // setflag(true);
           if(data.result.rows){
              
            setitem(data.result.rows);
           

          }else{
            setitem(null)
          }
         
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
              background:'none',
            },
          }}
          label='Search'
          placeholder='perlink'
        />
        <button className='btn-com' onClick={handleSearch}>Search</button>
        </div>
        {flag && !item &&
        <div><h2>No search data available to show <br /> <b>Do check you have given correct input</b></h2></div>

        }
        
        {flag && item &&
        <div className='comm-table'>
        <h2>History</h2>
         <table className='table' >
          <thead>
            <tr>
              <th>Serial</th>
              <th>Metadata</th>
              <th>Title</th>
              <th>Body</th>
              
              
              
              {/* Add more table headers for each property */}
            </tr>
          </thead>
          <tbody>
          {item.map((object,index) => ( 
              <tr key={index}>
                <td>{index}</td>
                <td>{object[1]}</td>
                <td>{object[2]}</td>
                <td>{object[3]}</td>
                
    
                {/* Render more table cells for each property */}
              </tr>
               ))} 
          </tbody>
        </table>
       </div>

        }

    </div>
    

  );
};

export default Contenthistory;