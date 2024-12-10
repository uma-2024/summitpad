import React from "react";
import "./GStacking.css";
import RightCard from "./RightCard.jsx";
import HowWorksCycle from "./HowWorksCycle.jsx";
import { Navigate, useNavigate } from "react-router-dom";
const GStacking = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate('/unite-form')
  }
  return (
    <div className="gstacking">
      <div className="g-left">
        <h1>
          How
          <span>STAKING</span>WORKS
        </h1>
        <p>
          The sole project with a thriving live ecosystem. It has maintained a
          market presence since 2022, making it an influential and enduring
          player in the crypto space.
        </p>
      </div>
      <div className="g-right">
        {/* <RightCard/> */}
        <HowWorksCycle />
        <div className="list-data-cont">
        <h3>Participation Rules</h3>
        <ol className="list-data">
          <li>
            <strong>Mandatory Platforms:</strong>Each participant must post on
            Twitter, CoinMarketCap, and Instagram to qualify.
          </li>
          <li>
            <strong>Minimum Group Size:</strong> Groups must have at least 5
            people to participate.
          </li>
          <li>
            <strong>Posting Requirement:</strong> At least 50% of the group must
            post to qualify (e.g., for 10 participants, at least 5 must post).
          </li>
          <li>
            <strong>One Participation Per Month:</strong>Each user can join only
            once per month to ensure fairness.
          </li>
          <li>
            <strong>Daily Reward Cap:</strong> A total of $1000 is distributed
            daily among all groups.
          </li>
        </ol>
        </div>
       
        <div className="list-data-cont1">
        <h3>Why Participate?</h3> 



        <ol className="list-data">
          <li>
            <strong>Earn Summit Tokens:</strong> Turn your group activity into real rewards.
          </li>
          <li>
            <strong>Build Community: </strong> Connect with like-minded individuals and grow Summit’s global reach.
          </li>
          <li>
            <strong>Boost Visibility:</strong>  Showcase your city and country as part of the global Summit community.
          </li>
        </ol>
        </div>
        <button className="submit123" onClick={handleClick}>Summit your Proof Now</button>
      </div>
    </div>
  );
};

export default GStacking;
