import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units";
import useBuilderContext from "./useBuilderContext";

export const useBidOnAuction = () => {
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
    const bidABI = [
      {
        inputs: [
          { internalType: "uint256", name: "_tokenId", type: "uint256" },
        ],
        name: "createBid",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ];

    const contract = new ethers.Contract(
      context?.auctionAddress || "",
      bidABI,
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

  // wrapper over contract interaction so end user can simply call
  // action(bidAmount)
  const action = (bidAmount: string) => {
    return contract?.createBid(62, { value: parseUnits(bidAmount, 18) });
  };

  return { action };
};
