import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Stacking.css';
import wallet from '../assets/Images/ion_wallet.svg';
import golden from '../assets/Images/golden-tier 1.png';
import useWagmiReadMethod from '../Hooks/wagmiReadMethod';
import tokenAbi from "../ABI/Token.abi.json"
import StakingContractAbi from "../ABI/StakingContract.abi.json"
import { useAccount, useWaitForTransaction } from 'wagmi';
import useWagmiWriteMethod from '../Hooks/wagmiWriteMethod';
import LoadingModal from './Modal/LoadingModal';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import axios from 'axios';
import wagmiReadMethodNonInt, { BigIntArrayConverter } from '../Hooks/wagmiReadMethodNonInt';
import DropdownComponent from './DropdownComponent';
import { isAddress } from 'viem';
import { shortenAddress } from '../Utils/HelperFunctions';

const Stacking = () => {
    const { referralId } = useParams()
    const { address } = useAccount();
    const { open, close } = useWeb3Modal()
    const zeroAddress = "0x0000000000000000000000000000000000000000"
    const MMT_TOKEN_ADDRESS = "0xcF0d61Cbd5Dc16cb7dCf36D80630e633D1f9A0Ee";
    const STAKING_TOKEN_ADDRESS = "0xAceD5F8540692bE0929fd6e43b25eB0377829b81";
    const [allowance, setAllowance] = useState(0);
    const [inputValues, setInputValues] = useState(['', '', '']);
    const [tnxHash, setTnxHash] = useState("")
    const [approveAmount, setApproveAmount] = useState(0)
    const { isError, isLoading, isSuccess } = useWaitForTransaction({
        hash: tnxHash,
    })
    const [accumulateId, setAccumulateId] = useState(0)
    const [AmountArray, setAmountArray] = useState({})
    const [PackageArrays, setPackageArrays] = useState([[], [], []])

    const [StakingIds, setStakingIds] = useState([])
    const [referralAddress, setReferralAddress] = useState(referralId?referralId:zeroAddress)
    const [selectedId, setSelectedId] = useState({ "0": null, "1": null, "2": null })
    const { method: readAllowanceMethod } = useWagmiReadMethod(tokenAbi, MMT_TOKEN_ADDRESS, "allowance", [address, STAKING_TOKEN_ADDRESS]);
    const { method: readStakingMethod } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "getStakingIDs", [address], false);
    const { method: readAmountMethod } = useWagmiReadMethod(StakingContractAbi, STAKING_TOKEN_ADDRESS, "getAccumulatedAmount", [accumulateId]);
    const { method: readPackageArrayMethod0 } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "getpackageStakingIds", [address, 0], false);
    const { method: readPackageArrayMethod1 } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "getpackageStakingIds", [address, 1], false);
    const { method: readPackageArrayMethod2 } = wagmiReadMethodNonInt(StakingContractAbi, STAKING_TOKEN_ADDRESS, "getpackageStakingIds", [address, 2], false);
    const { method: approveMethod, hash: approveTxHash } = useWagmiWriteMethod(tokenAbi, MMT_TOKEN_ADDRESS, "approve");
    const { method: stakeMethod, hash: stakeHash } = useWagmiWriteMethod(StakingContractAbi, STAKING_TOKEN_ADDRESS, "referralStake");
    const { method: claimAmountMethod, hash: clameAmountHash } = useWagmiWriteMethod(StakingContractAbi, STAKING_TOKEN_ADDRESS, "claimAmount");

    console.log("PackageArrays", PackageArrays);
    const navigate = useNavigate();

    const handleReferralRewardsClick = () => {
        navigate('/rewards');
    };

    console.log("AmountArray", AmountArray);
    useEffect(() => {
        const readStkingIdsPackage = async () => {
            try {
                const package1Data = BigIntArrayConverter(await readPackageArrayMethod0())
                const package2Data = BigIntArrayConverter(await readPackageArrayMethod1())
                const package3Data = BigIntArrayConverter(await readPackageArrayMethod2())
                PackageArrays[0] = package1Data
                PackageArrays[1] = package2Data
                PackageArrays[2] = package3Data
                setPackageArrays(PackageArrays)

                console.log("ssccaa", package1Data, package2Data, package3Data);
            } catch (error) {
                console.log("Error in readStkingIdsPackage:", error);
            }
        };
        if (address) {
            readStkingIdsPackage();
        }
    }, [address, isSuccess])


    useEffect(() => {
        const readAccumulateData = async () => {
            try {
                console.log("hey", accumulateId);
                const AccumulatedAmount = await readAmountMethod()
                const temp = AmountArray
                temp[accumulateId] = AccumulatedAmount
                setAmountArray(temp)
                console.log("AccumulatedAmount", accumulateId, AccumulatedAmount);

            } catch (error) {
                console.log("Error in readAccumulateData:", error);
            }
        };
        if (address) {
            readAccumulateData();
        }
        if (accumulateId < 2) {
            setAccumulateId(accumulateId + 1)
        }
    }, [accumulateId, address, isSuccess])


    console.log("StakingIds", StakingIds);
    const [usdPrice, setUsdPrice] = useState(2.8146e-8);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/binance/contract/0x9767c8e438aa18f550208e6d1fdf5f43541cc2c8');
                const usdPrice = response.data?.market_data?.current_price?.usd;
                setUsdPrice(usdPrice);
            } catch (error) {
                console.log("error in fetching coin price");
            }
        };
        fetchCoinData();
    }, []);
    console.log("usdPrice", usdPrice);

    const handleApprove = async (approveAmountValue) => {
        const txHash = await approveMethod([STAKING_TOKEN_ADDRESS, approveAmountValue]);
        setTnxHash(txHash)
        console.log('Transaction Hash:', txHash);
    };

    const handleStaking = async (stakeAmountValue, packageIndex) => {
        const txHash = await stakeMethod([stakeAmountValue, packageIndex, referralAddress]);
        setTnxHash(txHash)
        console.log('Transaction Hash:', txHash);
    };

    const handleClaimAmount = async (packageIde) => {
        console.log("sdaa", packageIde);
        const txHash = await claimAmountMethod([packageIde]);
        setTnxHash(txHash)
        console.log('Transaction Hash:', txHash);
    };

    useEffect(() => {
        const readAllowanceData = async () => {
            try {
                const data = await readAllowanceMethod();
                const IdsData = await readStakingMethod();
                const AccumulatedAmount = await readAmountMethod()
                console.log("AccumulatedAmount", AccumulatedAmount);
                setStakingIds(BigIntArrayConverter(IdsData));
                if (data >= 0) {
                    setAllowance(data);
                }
            } catch (error) {
                console.log("Error in readAllowanceData:", error);
            }
        };
        if (address) {
            readAllowanceData();
        }
    }, [address, isSuccess]);

    const handleInputChange = (index) => (e) => {
        const value = e.target.value;
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    const handleStack = (index) => async () => {
        const value = inputValues[index];

        if (value) {
            console.log(`Stacking from input ${index}: ${value}`);

            // Determine if we need to approve or stake
            const inputValue = parseFloat(value);
            console.log("usdPrice", usdPrice);
            if (index === 0) {
                if (usdPrice * inputValue < 100) {
                    alert(`Less amount not allowed, At least stake ${100 / usdPrice}`)
                    return
                }
                if (allowance >= inputValue) {
                    // Call stake method
                    console.log("Staking...");
                    await handleStaking(inputValue * 10 ** 18, 0)
                    // Replace with your stake logic
                } else {
                    // Call approve method
                    console.log("Approving...", inputValue);
                    setApproveAmount(inputValue * 10 ** 18); // Set the amount directly in Wei
                    await handleApprove(inputValue * 10 ** 18);
                    // Replace with your approve logic
                }
            } else if (index === 1) {
                if (usdPrice * inputValue < 500) {
                    alert(`Less amount not allowed, At least stake ${500 / usdPrice}`)
                    return
                }
                if (allowance >= inputValue) {
                    // Call stake method
                    console.log("Staking...");
                    await handleStaking(inputValue * 10 ** 18, 1)

                    // Replace with your stake logic
                } else {
                    // Call approve method
                    console.log("Approving...", inputValue);
                    setApproveAmount(inputValue * 10 ** 18); // Set the amount directly in Wei
                    await handleApprove(inputValue * 10 ** 18);

                    // Replace with your approve logic
                }
            } else if (index === 2) {
                if (usdPrice * inputValue < 1000) {
                    alert(`Less amount not allowed, At least stake ${1000 / usdPrice}`)
                    return
                }
                if (allowance >= inputValue) {
                    // Call stake method
                    console.log("Staking...");

                    await handleStaking(inputValue * 10 ** 18, 2)

                    // Replace with your stake logic
                } else {
                    // Call approve method
                    console.log("Approving...", inputValue);
                    setApproveAmount(inputValue * 10 ** 18); // Set the amount directly in Wei
                    await handleApprove(inputValue * 10 ** 18);
                    // Replace with your approve logic
                }
            }
        }
    };





    // Disable conditions for buttons based on input values
    const isButtonDisabled = (index) => {
        const value = parseFloat(inputValues[index]);

        if (index === 0) {
            // Disable if input is empty or not less than 500
            return !value || value < 100 / usdPrice;
        } else if (index === 1) {
            // Disable if input is empty, less than 500, or greater than or equal to 1000
            return !value || value < 100 / usdPrice || value >= 1000 / usdPrice;
        } else if (index === 2) {
            // Disable if input is empty or less than 1000
            return !value || value < 1000 / usdPrice;
        }

        return false;
    };

    useEffect(() => {
        // isAddress(referralAddress) ? setReferralAddress(referralAddress) : setReferralAddress(zeroAddress)
    }, [referralAddress])
    console.log("referralAddress", referralAddress);
    return (
        <div className='stacking'>
            <h2><span>MMIT’s</span> Staking</h2>
            <div >

                <input placeholder='Referral Address'  onChange={e => setReferralAddress(e.target.value)}></input>
            </div>

            <div className='stack-card'>
                <div className='stack-card01'>
                    <div>
                        <h1>POD-1</h1>
                    </div>
                    <img src={golden} alt='' />
                </div>
                <div className='stack-card02'>
                    <div>
                        <div className='stack-card-details'>
                            <p>Apr</p>
                            <p>20%</p>
                        </div>
                        <div className='stack-card-details'>
                            <p>Locking Period</p>
                            <p>360 Days</p>
                        </div>
                        <div className='stack-card-details2'>
                            <input
                                type='text'
                                value={inputValues[0]}
                                onChange={handleInputChange(0)}
                                placeholder={`>= ${100 / usdPrice}`}
                                title={`>= ${100 / usdPrice}`}
                            />
                        </div>
                        <div className='stack-card-details'>
                            {
                                !address ? <button className="d-hero-g-btn" onClick={open}>{"Connect Wallet"}</button> :
                                    <button onClick={handleStack(0)} disabled={isButtonDisabled(0)} title={isButtonDisabled(0) && "Invalid input"}>
                                        {allowance >= parseFloat(inputValues[0]) ? 'Stake' : 'Approve'}
                                    </button>
                            }

                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="730" height="12" viewBox="0 0 830 12" fill="none">
                        <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM829.773 6L824 0.226497L818.227 6L824 11.7735L829.773 6ZM6 7H824V5H6V7Z" fill="#757575" fillOpacity="0.5" />
                    </svg>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '100%' }}></div>
                    </div>
                    <div className='stack-card-3'>

                        <div>
                            <div className='Reward-start'>
                                <h5>Reward Start</h5>
                                <span>After 100 Days Of Stacking</span>
                            </div>

                            <div className='detail-card'>
                                <div><span>Available: {AmountArray?.[0] ? AmountArray?.[0] : 0}</span></div>
                                <DropdownComponent step={0} selectedId={selectedId} setSelectedId={setSelectedId} StakingIds={PackageArrays?.[0]} />
                                <div><span onClick={() => { handleClaimAmount(selectedId["0"]) }}>Claim</span>
                                </div>
                            </div>
                        </div>
                        {/* <button className='mobile-button'>Connect</button> */}
                    </div>
                </div>
            </div>
            <div className='stack-card card22'>
                <div className='stack-card02'>
                    <div>
                        <div className='stack-card-details'>
                            <p>Apr</p>
                            <p>25%</p>
                        </div>
                        <div className='stack-card-details'>
                            <p>Locking Period</p>
                            <p>360 Days</p>
                        </div>
                        <div className='stack-card-details2'>
                            <input
                                type='text'
                                value={inputValues[1]}
                                onChange={handleInputChange(1)}
                                placeholder={`>= ${500 / usdPrice}`}
                                title={`>= ${500 / usdPrice}`}
                            />
                        </div>
                        <div className='stack-card-details'>
                            {
                                !address ? <button className="d-hero-g-btn" onClick={open}>{"Connect Wallet"}</button> :
                                    <button onClick={handleStack(1)} disabled={isButtonDisabled(1)} title={isButtonDisabled(1) && "Invalid input"}>
                                        {allowance >= parseFloat(inputValues[1]) ? 'Stake' : 'Approve'}
                                    </button>}
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="730" height="12" viewBox="0 0 830 12" fill="none">
                        <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM829.773 6L824 0.226497L818.227 6L824 11.7735L829.773 6ZM6 7H824V5H6V7Z" fill="#757575" fillOpacity="0.5" />
                    </svg>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '100%' }}></div>
                    </div>
                    <div className='stack-card-3'>
                        <div>
                            <div className='Reward-start'>
                                <h5>Reward Start</h5>
                                <span>After 100 Days Of Stacking</span>
                            </div>

                            <div className='detail-card'>
                                <div><span>Available: {AmountArray?.[1] ? AmountArray?.[1] : 0}</span></div>
                                <DropdownComponent step={1} selectedId={selectedId} setSelectedId={setSelectedId} StakingIds={PackageArrays?.[1]} />
                                <div><span onClick={() => { handleClaimAmount(selectedId["0"]) }}>Claim</span>
                                </div>
                            </div>
                        </div>
                        {/* <button className='mobile-button'><img src={wallet} alt="" />Connect</button> */}
                    </div>
                </div>
                <div className='stack-card01 right-card'>
                    <div>
                        <h1>POD-2</h1>
                    </div>
                    <img src={golden} alt='' />
                </div>
            </div>
            <div className='stack-card'>
                <div className='stack-card01'>
                    <div>
                        <h1>POD-3</h1>
                    </div>
                    <img src={golden} alt='' />
                </div>
                <div className='stack-card02'>
                    <div>
                        <div className='stack-card-details'>
                            <p>Apr</p>
                            <p>30%</p>
                        </div>
                        <div className='stack-card-details'>
                            <p>Locking Period</p>
                            <p>360 Days</p>
                        </div>
                        <div className='stack-card-details2'>
                            <input
                                type='text'
                                value={inputValues[2]}
                                onChange={handleInputChange(2)}
                                placeholder={`>= ${1000 / usdPrice}`}
                                title={`>= ${1000 / usdPrice}`}
                            />
                        </div>
                        <div className='stack-card-details'>
                            {
                                !address ? <button className="d-hero-g-btn" onClick={open}>{"Connect Wallet"}</button> :
                                    <button onClick={handleStack(2)} disabled={isButtonDisabled(2)} title={isButtonDisabled(2) && "Invalid input"}>
                                        {allowance >= parseFloat(inputValues[2]) ? 'Stake' : 'Approve'}
                                    </button>
                            }
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="730" height="12" viewBox="0 0 830 12" fill="none">
                        <path d="M0.226497 6L6 11.77356L11.7735 6L6 0.226497L0.226497 6ZM829.773 6L824 0.226497L818.227 6L824 11.7735L829.773 6ZM6 7H824V5H6V7Z" fill="#757575" fillOpacity="0.5" />
                    </svg>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '100%' }}></div>
                    </div>
                    <div className='stack-card-3'>
                        <div>
                            <div className='Reward-start'>
                                <h5>Reward Start</h5>
                                <span>After 100 Days Of Stacking</span>
                            </div>

                            <div className='detail-card'>
                                <div><span>Available: {AmountArray?.[2] ? AmountArray?.[2] : 0}</span></div>
                                <DropdownComponent step={2} selectedId={selectedId} setSelectedId={setSelectedId} StakingIds={PackageArrays?.[2]} />
                                <div><span onClick={() => { handleClaimAmount(selectedId["0"]) }}>Claim</span>
                                </div>
                            </div>
                        </div>
                        {/* <button className='mobile-button'><img src={wallet} alt="" />Connect</button> */}
                    </div>
                </div>
            </div>
            <div className='reward-btn'>
                <button onClick={handleReferralRewardsClick}>Referral Rewards</button>
            </div>

            <LoadingModal isLoading={isLoading} msg={"please wait till the transaction completes"} />

        </div>
    );
}

export default Stacking;
