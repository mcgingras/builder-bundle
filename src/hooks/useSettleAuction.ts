import { useState, useEffect } from "react";
import { ethers } from "ethers";
import useBuilderContext from "./useBuilderContext";

export const useSettleAuction = () => {
  const [contract, setContract] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const context = useBuilderContext();

  const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner(0);
    setSigner(signer);
  };

  const initContract = () => {
    const settleAuctionABI = [
      {
        inputs: [],
        name: "settleCurrentAndCreateNewAuction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const contract = new ethers.Contract(
      context?.auctionAddress || "",
      settleAuctionABI,
      signer
    );

    setContract(contract);
  };

  useEffect(() => {
    if (!signer) {
      getSigner();
    } else {
      initContract();
    }
  }, [signer]);

  return {
    action: contract?.settleCurrentAndCreateNewAuction,
  };
};
