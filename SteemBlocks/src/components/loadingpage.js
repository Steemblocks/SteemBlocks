import React from 'react';
import '../LoadingPage.css';
import imageIcon from '../public/steem_logo.png'
//import loadingIcon from './loading-icon.svg';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-image">
        <img src={imageIcon} alt="Loading" />       
      </div>
      <div className='loadtext'>
      <span>SteemBlocks developed by @dhaka.witness</span>
      </div>
      <div className="loading-sign">
      <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default LoadingPage;