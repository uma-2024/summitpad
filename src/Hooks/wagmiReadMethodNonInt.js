import { useContractRead } from "wagmi";
import { useState } from "react";
import BigNumber from "bignumber.js";

const wagmiReadMethodNonInt = (abi, contractAddress, functionName, params,isBigInt) => {
  const [data, setData] = useState(null);
  const [wholeData, setWholeData] = useState(null);

  const { refetch: refetchMethod } = useContractRead({
    abi: abi,
    address: contractAddress,
    functionName: functionName,
    args: params,
  });

  const method = async () => {
    try {
      const result = await refetchMethod();
      console.log("result",result);
      if (result) {
        if(isBigInt)
        {
          const value = new BigNumber(result?.data);
          const dividedValue = value.dividedBy(new BigNumber(10).pow(18));
          setData( dividedValue?.c[0]);
          setWholeData(result);
          return  dividedValue?.c[0];
        }
        else
        {
          setData( result?.data);
          setWholeData(result);
          return  result?.data;
        }
      }
    } catch (error) {
      console.error(`Error in ${functionName}`, error);
    }
  };

  return { method, data, wholeData };
};

export default wagmiReadMethodNonInt;

export const BigIntArrayConverter= (originalArray)=>{
  const doubledArray = originalArray.map(number => new BigNumber(number)?.c[0]);
   return doubledArray
}