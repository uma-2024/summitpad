import React, { useEffect, useState } from 'react'
import './OurReward.css'
import rewardImage from '../assets/Images/rewards.gif';
import rewardsImage from '../assets/Images/reward.gif';
import champImage from '../assets/Images/champ.gif';
import Navbar from './header/Navbar';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccount, useWaitForTransaction } from 'wagmi';
import StakingContractAbi from "../ABI/StakingContract.abi.json"
import useWagmiWriteMethod from '../Hooks/wagmiWriteMethod';
import wagmiReadMethodNonInt from '../Hooks/wagmiReadMethodNonInt';
const OurReward = () => {
  const { address } = useAccount()
  const [teamCount, setTeamCount] = useState(0)
  const [referrerClaimAmountMethodState, setReferrerClaimAmountMethodState] = useState(0)
  const [referrerClaimedAmountMethodState, setReferrerClaimedAmountMethodState] = useState(0)

  const [level1, setLevel1] = useState([])
  const [level2, setLevel2] = useState([])
  const [level3, setLevel3] = useState([])
  const [levelCurrent, setlevelCurrent] = useState([])





  const zeroAddress = "0x0000000000000000000000000000000000000000"
  const MMT_TOKEN_ADDRESS = "0xcF0d61Cbd5Dc16cb7dCf36D80630e633D1f9A0Ee";
  const STAKING_TOKEN_ADDRESS = "0xAceD5F8540692bE0929fd6e43b25eB0377829b81";
  const [tnxHash, setTnxHash] = useState("")
  const { isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: tnxHash,
  })

  const { method: referralClaimMethod, hash: referralClaimHash } = useWagmiWriteMethod(StakingContractAbi, STAKING_TOKEN_ADDRESS, "referralClaim");
  const { method: getTotalreferralMethod } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "getTotalreferralCount", [address], false);
  const { method: referrerClaimAmountMethod } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "referrerClaimAmount", [address], false);
  const { method: referrerClaimedAmounttMethod } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "referrerClaimedAmount", [address], false);

  const { method: getTotalLevelreferralMethod1 } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "getTotalLevelreferral", [address, 1], false);
  const { method: getTotalLevelreferralMethod2 } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "getTotalLevelreferral", [address, 2], false);
  const { method: getTotalLevelreferralMethod3 } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "getTotalLevelreferral", [address, 3], false);





  console.log("count", levelCurrent);
  useEffect(() => {
    const handletTotalreferralMethod = async (approveAmountValue) => {
      const result = await getTotalreferralMethod();
      const result2 = await referrerClaimAmountMethod()
      const result3 = await referrerClaimedAmounttMethod()

      const result4 = await getTotalLevelreferralMethod1()
      const result5 = await getTotalLevelreferralMethod2()
      const result6 = await getTotalLevelreferralMethod3()


      setTeamCount(Number(result))
      setReferrerClaimAmountMethodState(Number(result2))
      setReferrerClaimedAmountMethodState(Number(result3))

      setLevel1(result4)
      setLevel2(result5)
      setLevel3(result6)

      setlevelCurrent([...result4, ...result5, ...result6])

      console.log("result", result2);
    };
    handletTotalreferralMethod()
  }, [address, isSuccess])


  const handleReferralClaim = async () => {
    const txHash = await referralClaimMethod([]);
    setTnxHash(txHash)
    console.log('Transaction Hash:', txHash);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/staking/${address}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy the link: ', err);
    });
  };
  const [myLevel,setMyLevel] = useState("All")
console.log("levelCurrent",levelCurrent);
  const handleClicke = (e) => {
    setMyLevel(e==0?"All":e)
    console.log("sss", e);
    if (e == 0) {
      setlevelCurrent([...level1, ...level2, ...level3])
    }
    if (e == 1) {
      setlevelCurrent([...level1])
    }
    if (e == 2) {
      setlevelCurrent([...level2])
    }
    if (e == 3) {
      setlevelCurrent([...level3])
    }
  }

  return (
    <div className='ourReward'>
      <Navbar />
      <div className='reward-cards'>
        <div className='reward-card0 reward-card'>
          <img src={rewardImage} />
          <h4>Total Rewards</h4>
          <h5>{referrerClaimedAmountMethodState}</h5>
          <p>Avail your rewards now</p>
          <span>Get your Rewards</span>
        </div>
        <div className='reward-card1 reward-card'>
          <img src={rewardsImage} />
          <h4>Available Rewards</h4>
          <h5> {  Math.round(referrerClaimAmountMethodState / 10 ** 18)}</h5>
          <p>Claim your rewards now</p>
          <span style={{ cursor: "pointer" }} onClick={handleReferralClaim}>Claim your Rewards</span>
        </div>
        <div className='reward-card2 reward-card'>
          <img src={champImage} />
          <h4>Total teams</h4>
          <h5>{teamCount}</h5>
          <p>Select your team</p>
          <span>Be a Member</span>
        </div>
      </div>

      <div className='reward-table'>


        <h2 style={{ cursor: 'pointer' }} onClick={handleCopyLink}><span>CLICK HERE TO  COPY  REFERRAL CODE</span> </h2>
        <br />
        <h2><span>MMIT’s</span> Referral Incentives</h2>

        <div className='level-btn'>
          <div class="dropdown drop">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="23" viewBox="0 0 21 23" fill="none">
                <g clip-path="url(#clip0_511_1038)">
                  <path d="M5.05005 8.59009H0.925049C0.742712 8.59009 0.567844 8.66252 0.438913 8.79145C0.309982 8.92038 0.237549 9.09525 0.237549 9.27759L0.237549 18.9026C0.237549 19.0849 0.309982 19.2598 0.438913 19.3887C0.567844 19.5177 0.742712 19.5901 0.925049 19.5901H5.05005C5.23239 19.5901 5.40725 19.5177 5.53618 19.3887C5.66512 19.2598 5.73755 19.0849 5.73755 18.9026V9.27759C5.73755 9.09525 5.66512 8.92038 5.53618 8.79145C5.40725 8.66252 5.23239 8.59009 5.05005 8.59009ZM4.36255 18.2151H1.61255V9.96509H4.36255V18.2151ZM12.6125 0.340088H8.48755C8.30521 0.340088 8.13034 0.412521 8.00141 0.541452C7.87248 0.670383 7.80005 0.845252 7.80005 1.02759V18.9026C7.80005 19.0849 7.87248 19.2598 8.00141 19.3887C8.13034 19.5177 8.30521 19.5901 8.48755 19.5901H12.6125C12.7949 19.5901 12.9698 19.5177 13.0987 19.3887C13.2276 19.2598 13.3 19.0849 13.3 18.9026V1.02759C13.3 0.845252 13.2276 0.670383 13.0987 0.541452C12.9698 0.412521 12.7949 0.340088 12.6125 0.340088ZM11.925 18.2151H9.17505V1.71509H11.925V18.2151ZM20.175 11.3401H16.05C15.8677 11.3401 15.6928 11.4125 15.5639 11.5415C15.435 11.6704 15.3625 11.8453 15.3625 12.0276V18.9026C15.3625 19.0849 15.435 19.2598 15.5639 19.3887C15.6928 19.5177 15.8677 19.5901 16.05 19.5901H20.175C20.3574 19.5901 20.5323 19.5177 20.6612 19.3887C20.7901 19.2598 20.8625 19.0849 20.8625 18.9026V12.0276C20.8625 11.8453 20.7901 11.6704 20.6612 11.5415C20.5323 11.4125 20.3574 11.3401 20.175 11.3401ZM19.4875 18.2151H16.7375V12.7151H19.4875V18.2151ZM0.237549 20.9651H5.73755V22.3401H0.237549V20.9651ZM7.80005 20.9651H13.3V22.3401H7.80005V20.9651ZM15.3625 20.9651H20.8625V22.3401H15.3625V20.9651Z" fill="#D8D8D8" />
                </g>
                <defs>
                  <clipPath id="clip0_511_1038">
                    <rect width="20.625" height="22" fill="white" transform="translate(0.237549 0.340088)" />
                  </clipPath>
                </defs>
              </svg> Level {myLevel}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li onClick={() => handleClicke(0)}><a class="dropdown-item" href="#">All Levels</a></li>
              <li onClick={() => handleClicke(1)}><a class="dropdown-item" href="#">Level 1</a></li>
              <li onClick={() => handleClicke(2)}><a class="dropdown-item" href="#">Level 2</a></li>
              <li onClick={() => handleClicke(3)}><a class="dropdown-item" href="#">Level 3</a></li>
            </ul>
          </div>
        </div>
        <div className='table-container'>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Address</th>
                <th scope="col">Amount</th>
                <th scope="col">Level</th>
              </tr>
            </thead>
            <tbody>
{
  levelCurrent?.map((el,i)=>{
    return(
      <tr>
      <th scope="row">{i+1}</th>
      <td>{el?.staker}</td>
      <td>$ {Number(el?.amount)/10**18}</td>
      <td><span>Level-{myLevel}</span></td>
    </tr>
    )
  })
}
          
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OurReward
