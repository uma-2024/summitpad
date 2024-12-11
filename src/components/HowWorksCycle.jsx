import React from 'react'
import walletImage from '../../src/assets/Images/walletImage.gif'
import circleImage from '../../src/assets/Images/circle.png'
import roundImage from '../../src/assets/Images/round-circle.png'
import './HowWorksCycle.css'
const HowWorksCycle = () => {
  return (
    <div className='HowWorksCycle'>
      <div className='cycleCards'>
        <div className='cycleCard card1'>
            <span>1</span>
            <h2>Form Your Group</h2>
        <p>Gather a team of at least 5 people.</p>
        <img src={walletImage}/>
        </div>
        <div className='cycleCard card4'>
        <span>4</span>
            <h2>Earn Reward</h2>
        <p>5-10 participants: Earn up to $20. <br/>11-20 participants: Earn up to $40. <br/>21+ participants: Earn up to $50.</p>
        <img src={walletImage}/>
        </div>
      </div>
      <div className="reveal-animation-container ">
      <img className="circle-img" src={circleImage} alt="Circle" />
      <img className="round-img" src={roundImage} alt="Round" />
    </div>
      <div className='cycleCards'>
        <div className='cycleCard card2'>
        <span>2</span>
            <h2>Form Your Group</h2>
        <p>Gather a team of at least 5 people.</p>
        <img src={walletImage}/>
        </div>
        <div className='cycleCard card3'>
        <span>3</span>
            <h2>Form Your Group</h2>
        <p>Gather a team of at least 5 people.</p>
        <img src={walletImage}/>
        </div>
      </div>
    </div>
  )
}

export default HowWorksCycle
