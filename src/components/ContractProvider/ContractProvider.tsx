import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ContractContext } from "../../store/contractContext";
import useBuilderContext from "../../hooks/useBuilderContext";
import { governorABI } from "../../data/abis/governor";

const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useBuilderContext();
  const [governorContract, setGovernorContract] = useState<any>();
  const loadContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      context?.governorAddress || "",
      governorABI,
      provider
    );

    setGovernorContract(contract);
  };

  useEffect(() => {
    loadContract();
  }, []);

  return (
    <ContractContext.Provider
      value={{
        governorContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
