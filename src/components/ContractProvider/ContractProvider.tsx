import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ContractContext } from "../../store/contractContext";
import useBuilderContext from "../../hooks/useBuilderContext";
import { auctionABI } from "../../data/abis/auction";
import { governorABI } from "../../data/abis/governor";
import { tokenABI } from "../../data/abis/token";

const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useBuilderContext();
  const [governorContract, setGovernorContract] = useState<any>();
  const [auctionContract, setAuctionContract] = useState<any>();
  const [collectionContract, setCollectionContract] = useState<any>();

  const loadContracts = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract_g = new ethers.Contract(
      context?.governorAddress || "",
      governorABI,
      provider
    );

    const contract_a = new ethers.Contract(
      context?.auctionAddress || "",
      auctionABI,
      provider
    );

    const contract_c = new ethers.Contract(
      context?.collectionAddress || "",
      tokenABI,
      provider
    );

    setGovernorContract(contract_g);
    setAuctionContract(contract_a);
    setCollectionContract(contract_c);
  };

  useEffect(() => {
    loadContracts();
  }, []);

  return (
    <ContractContext.Provider
      value={{
        governorContract,
        auctionContract,
        collectionContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
