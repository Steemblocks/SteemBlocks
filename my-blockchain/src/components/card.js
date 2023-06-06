import React from 'react';
import '../card.css';

const Card = ({ title,content }) => {
   // console.log(content)
  return (
    <div>
        {title && content &&
        <div className="card">
        <h3 className="card-title">{title}</h3>
       { content.map((object,index) => (
          <p key={index}><span>{object}</span></p>
          
  
         ))}
      </div>}
    </div>
  );
};

export default Card;