import React, { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { parseUnits } from "@ethersproject/units";
import Countdown from "../Countdown";
import { useAuction } from "../../hooks/useAuction";
import { useBidsForToken } from "../../hooks/useBids";
import useBuilderContext from "../../hooks/useBuilderContext";
import { useTokenMetadata } from "../../hooks/useTokenMetadata";

const ActiveAuction = ({ className }: { className: string }) => {
  const context = useBuilderContext();
  const { data } = useAuction(context?.collectionAddress || "");

  return (
    <>
      {data && (
        <ActiveAuctionImage
          className={className}
          tokenId={data?.nouns?.nounsActiveMarket?.tokenId}
        />
      )}
    </>
  );
};

const ActiveAuctionImage = ({
  tokenId,
  className,
}: {
  tokenId: string;
  className: string;
}) => {
  const context = useBuilderContext();

  const { data: tokenMetadata } = useTokenMetadata(
    context?.collectionAddress || "",
    tokenId
  );

  return (
    <>
      {tokenMetadata && (
        <img
          src={tokenMetadata.token.token.metadata.image}
          className={className}
        />
      )}
    </>
  );
};

const AuctionTitleMetadata = ({ className }: { className: string }) => {
  const context = useBuilderContext();
  const { data } = useAuction(context?.collectionAddress || "");
  const activeMarket = data?.nouns?.nounsActiveMarket;
  const daoInfo = data?.nouns?.nounsDaos.nodes[0];

  return (
    <>
      {daoInfo && activeMarket && (
        <span className={className}>
          {daoInfo.name} {activeMarket.tokenId}
        </span>
      )}
    </>
  );
};

const AuctionPriceMetadata = ({ className }: { className: string }) => {
  const context = useBuilderContext();
  const { data } = useAuction(context?.collectionAddress || "");
  const activeMarket = data?.nouns?.nounsActiveMarket;

  return (
    <>
      {activeMarket && (
        <span className={className}>
          {activeMarket.highestBidPrice.nativePrice.decimal}{" "}
          {activeMarket.highestBidPrice.nativePrice.currency.name}
        </span>
      )}
    </>
  );
};

const AuctionCountdown = ({ className }: { className: string }) => {
  const context = useBuilderContext();
  const { data } = useAuction(context?.collectionAddress || "");

  const activeMarket = data?.nouns?.nounsActiveMarket;
  return (
    activeMarket && (
      <Countdown endTime={activeMarket.endTime} className={className} />
    )
  );
};

const ActiveBids = ({ children }: { children: any }) => {
  const context = useBuilderContext();
  const { bids } = useBidsForToken(context?.auctionAddress || "", 1);
  console.log("bids bids bids", bids);
  const bidss = [1, 2, 3, 4];

  // nextJS hack
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return children(bidss);
  }
};

const PlaceBidInput = ({ className }: { className: string }) => {
  const context = useBuilderContext();
  const [bidValue, setBidValue] = useState("0");

  const bidABI = [
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "createBid",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];

  const { config } = usePrepareContractWrite({
    address: context?.auctionAddress || "",
    abi: bidABI,
    functionName: "createBid",
    args: [2], // tokenId
    overrides: {
      // from: "",
      value: parseFloat(bidValue),
    },
  });

  const { write } = useContractWrite(config);

  const checkValidBid = (bid: string) => {
    const isValid = /^\d+(\.\d+)?$/.test(bid);
    if (!isValid) return;

    let parsedBid = parseUnits(bid, 18);
    // todo: check validity
    setBidValue(parsedBid.toString());
  };

  return (
    <div className="flex flex-row">
      <input
        className="border rounded px-2 mr-2"
        onChange={(e) => checkValidBid(e.target.value)}
        placeholder="0.00"
      ></input>
      <button onClick={() => write?.()} className={className}>
        place bid
      </button>
    </div>
  );
};

const SettleAuctionButton = ({ className }: { className: string }) => {
  const context = useBuilderContext();

  const settleAuctionABI = [
    {
      inputs: [],
      name: "settleCurrentAndCreateNewAuction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const { config } = usePrepareContractWrite({
    address: context?.auctionAddress || "",
    abi: settleAuctionABI,
    functionName: "settleCurrentAndCreateNewAuction",
  });

  const { write } = useContractWrite(config);

  return (
    <button className={className} disabled={!write} onClick={() => write?.()}>
      Settle Auction
    </button>
  );
};

ActiveAuction.ActiveBids = ActiveBids;
ActiveAuction.PlaceBidInput = PlaceBidInput;
ActiveAuction.Title = AuctionTitleMetadata;
ActiveAuction.Price = AuctionPriceMetadata;
ActiveAuction.Countdown = AuctionCountdown;
ActiveAuction.SettleAuctionButton = SettleAuctionButton;
export default ActiveAuction;
