import { useContractWrite } from "wagmi";
import { useEffect, useState } from "react";

const useWagmiWriteMethod = (abi, contractAddress, funnctionName) => {
  const [hash, setHash] = useState(null);

  const { writeAsync: refetchMethod,error:error } = useContractWrite({});
  useEffect(()=>{
    if(error?.message)
      {
        alert(error?.message)
      }
  },[error?.message])

console.log("errsr",error?.name);
  const method = async (params) => {
    console.log("params",params);
    try {
      const result = await refetchMethod({
        abi: abi,
        address: contractAddress,
        functionName: funnctionName,
        args: params,
      });
      if (result) {
        setHash(result?.hash);
        return result?.hash;
      }
    } catch (error) {
      console.error(`Error in ${funnctionName}`, error);
    }
  };

  return { method, hash };
};

export default useWagmiWriteMethod;
