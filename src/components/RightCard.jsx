// src/components/RightCard.jsx
import React from 'react';
import './RightCard.css';
import walletImage from '../../src/assets/Images/walletImage.gif'

const RightCard = () => {
  return (
    <div className="container">
      <div className="glass">
        <div className='glass-inner'>
        <h1>Form Your Group</h1>
        <h5><span>Gather a team of at least 5 people.</span></h5>
        </div>
        
       <img src={walletImage}/>
      </div>
      <div className="glass">
        <div className='glass-inner'>
        <h1>Create and Share</h1>
        <h5><span>Create a banner featuring the Summit logo, your city, and country name. Post group photos on Twitter, CoinMarketCap, and Instagram. </span></h5>
        </div>
        
        <img src={walletImage}/>
      </div>
      <div className="glass">
        <div className='glass-inner'>
        <h1>Submit Proof</h1>
        <h5><span>Upload your posts and links to the Summit website for verification.</span></h5>
        </div>
        
        <img src={walletImage}/>
      </div >
      <div className="glass">
        <div className='glass-inner'>
        <h1>Earn Rewards</h1>
        
        <h5><span>5-10 participants: Earn up to $20.<br/> 11-20 participants: Earn up to $40. <br/> 21+ participants: Earn up to $50.</span>
        <br/></h5>
        </div>
        
        <img src={walletImage}/>
      </div>
    </div>
  );
}

export default RightCard;
