// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { bsc, bscTestnet } from "viem/chains";

import Navbar from "./components/header/Navbar";
import HeroD from "./components/dashboard/Hero";
import Figure from "./components/dashboard/Figure";
import MarqueeS from "./components/dashboard/Marquee";
import News from "./components/dashboard/News/News";

import NewsLetter from "./components/dashboard/NewsLetter";
import IDO from "./components/dashboard/IDO";
import NewsPage from "./components/dashboard/News/NewsPage";
import Staking from "./components/Stack"; // Import Staking component
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const projectId = "c6cc849231f0c9770267752c7251f2b5";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [bsc, bscTestnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

import "./App.css";
import OurReward from "./components/OurReward";
import Footer from "./components/Footer";
import Stack from "./components/Stack";
import Stacking from "./components/Stacking";
import Steps from "./components/Steps";
import Staking2 from "./components/Stacking2";
import Stacking2 from "./components/Stacking2";
import UniteToEarn from "./components/UniteToEarn";
import FormComponent from "./components/FormComponent";

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <React.Fragment>
            <WagmiConfig config={wagmiConfig}>
              <>
                <Navbar />
                <div className="md:px-20 md:py-10 p-2 bg-[#0f0f0f]">
                  <HeroD />
                  <Figure />
                  <Steps />
                </div>
                <MarqueeS />
                <div className="md:px-20 md:py-10 p-2 bg-[#0f0f0f]">
                  <IDO />
                  {/* <News /> */}
                  {/* <NewsLetter /> */}
                  <Footer />
                </div>
              </>
            </WagmiConfig>
          </React.Fragment>
        }
      />
      <Route
        path="/staking/:referralId?"
        element={
          <WagmiConfig config={wagmiConfig}>
            <Staking />
          </WagmiConfig>
        }
      />
      <Route
        path="/news"
        element={
          <WagmiConfig config={wagmiConfig}>
            <NewsPage />
          </WagmiConfig>
        }
      />
      <Route path="/stacking" element={
        <WagmiConfig config={wagmiConfig}>
        <Navbar/>
        <Stacking2 /> 
        <Footer/>
        </WagmiConfig>
    
    } />
      <Route
        path="/rewards"
        element={
          <WagmiConfig config={wagmiConfig}>
            <OurReward /> {/* Add the OurReward route */}
          </WagmiConfig>
        }
      />
      <Route
        path="/unite-earn"
        element={
          <WagmiConfig config={wagmiConfig}>
             <Navbar/>
            <UniteToEarn/>
            <Footer/>
          </WagmiConfig>
        }
      />
      <Route
        path="/unite-form"
        element={
          <WagmiConfig config={wagmiConfig}>
             <Navbar/>
            <FormComponent/>
            <Footer/>
          </WagmiConfig>
        }
      />
    </Routes>
  );
}

export default App;
