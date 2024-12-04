import React from "react";
import "./Stacking2.css";

const Stacking2 = () => {
  return (
    <div className="stacking-main-container">
      <span className="staking-title">SUMMIT Staking</span>
    
    <div className="staking-container">

      <div className="staking-form">
        <div className="input-group">
          <label htmlFor="stakeAmount">Stake Amount</label>
          <input type="input" id="stakeAmount" placeholder="Enter amount" className="input1"/>
        </div>
        <div className="input-group">
          <label htmlFor="allocatedAmount">Allocated Amount for IDO</label>
          <input type="input" id="allocatedAmount" placeholder="Enter amount" className="input1" />
        </div>
        <button className="submit-button21">Submit</button>
      </div>
    </div>
    </div>
  );
};

export default Stacking2;
