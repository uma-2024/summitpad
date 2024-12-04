import React, { useEffect, useState } from "react";
import rocket from "../../assets/rocket.png";
import cloud from "../../assets/clouds.png";
import abi from './../../ABI/Token.abi.json'
import { useAccount, useWaitForTransaction, } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { shortenAddress } from "../../Utils/HelperFunctions";
import useWagmiWriteMethod from "../../Hooks/wagmiWriteMethod";
import useWagmiReadMethod from "../../Hooks/wagmiReadMethod";
import cloudImage from '../../assets/Images/Group 3.svg'
import cloudImage2 from '../../assets/Images/Group 2.svg'
import planeImage from '../../assets/Images/Group 1.svg'
const Hero = () => {
  const { address, isConnected } = useAccount()
  const { open, close } = useWeb3Modal()
  const [tnxHash, setTnxHash] = useState("")
  const { isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: tnxHash,
  })
  const [stakedAmount, setStakedAmount] = useState(999);


  
  return (
    <div className=" mb-4 overflow-hidden">
      <div className="md:order-1 order-2 summit-header">
        <h1 className="d-heading text-center md:text-left mt-10">
          {" "}
          <span className="d-heading-gardiant pr-1">Summit </span> - PEOPLE'S
          LAUNCHPAD
        </h1>
        <p className="d-hero-para text-center md:text-left">
        Step into Summit Launchpad—where vision ignites, promises deliver, and investments transform into extraordinary success. Join us on a journey where every idea becomes a triumph and every step inspires growth!
        </p>
        <p className="text-center md:text-left mb-4">
          {address ? "Your Total Staked Amount is  " + "    " + stakedAmount + "  MMIT  " : ''}
        </p>
        <div className="d-hero-btn-flex justify-center mb-3">
          <button className="apply-btn">Apply Now</button>
          <button className="d-hero-g-btn" onClick={open}>{address ? shortenAddress(address) : " Connect Wallet"}</button>

          {/* <button className="d-hero-dark-btn">Subscribe</button> */}
        </div>
      </div>
      <div
        style={{ margin: "0 auto" }}
        className="md:order-2 order-1 justify-center p-0 "
      >
        <div className="relative justify-around d-flex top-cloud align-items-center margin-cloud margin-100vw">
  <img
    className="cloud-Image animate-up"
    src={cloudImage2}
    alt="picture"
  />
  <img
    className="plane-image  animate"
    src={planeImage}
    alt="picture"
  />
  <img
    className="cloud-Image animate-up"
    src={cloudImage}
    alt="picture"
  />
</div>

      </div>
      <div className="header-gradient-div"></div>
    </div>
  );
};

export default Hero;
