import React from "react";
import ProjectCard from "./ProjectCard";
// import commingsoon from "../../assets/commingsoon.png";
import btcLogo from "../../assets/btc-logo.svg";
import ethLogo from "../../assets/eth-logo.svg";
import bnbLogo from "../../assets/Solana-Logo.png";

const IDO = () => {
  return (
    <div className="text-white p-12 mt-40">
      <div className="container mx-auto flex-col">
        <div className="text-center mb-12">
          <h1
            style={{ fontFamily: "fontbold" }}
            className="text-4xl font-bold mb-4"
          >
           Upcoming IDO
          </h1>
          <p className="mb-4">
            <span>Why SUMMITPAD?</span> Gain early access to innovative crypto projects with Summit's upcoming IDO. Secure exclusive token allocations and be part of the next big breakthrough in blockchain technology. Don't miss out!
            growth.
          </p>
        </div>

        <div className="hidden md:block"   style={{  width: "88%" }}>
          <div
          
            className="grid grid-cols-1 md:grid-cols-3 gap-8  "
          >
            <ProjectCard img={btcLogo} />
            <ProjectCard img={ethLogo} />
            <ProjectCard img={bnbLogo} />
          </div>
        </div>
        <div
          // style={{ position: "", width: "75%" }}
          className="block md:hidden "
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProjectCard />
          </div>
        </div>

        {/* <img
          style={{ position: "relative" }}
          className="ido-img mt-18 mx-auto"
          src={commingsoon}
          alt="soon"
        /> */}
      </div>
    </div>
  );
};

export default IDO;
