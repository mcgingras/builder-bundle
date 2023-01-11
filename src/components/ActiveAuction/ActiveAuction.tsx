import React from "react";
import { ethers } from "ethers";
import Countdown from "../Countdown";
import { useActiveAuction } from "../../hooks/useActiveAuction";
import { useBidsForToken } from "../../hooks/useBidsForToken";
import useBuilderContext from "../../hooks/useBuilderContext";
import { useTokenMetadata } from "../../hooks/useTokenMetadata";

const ActiveAuction = ({ className }: { className: string }) => {
  const { data } = useActiveAuction();

  return (
    <>
      {data && (
        <ActiveAuctionImage className={className} tokenId={data?.tokenId} />
      )}
    </>
  );
};

const SettleAuctionButton = ({ className }: { className: string }) => {
  const context = useBuilderContext();

  if (typeof window !== "undefined") {
    const settleAuctionABI = [
      {
        inputs: [],
        name: "settleCurrentAndCreateNewAuction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []);
    // const signer = provider.getSigner();
    const contract = new ethers.Contract(
      context?.auctionAddress || "",
      settleAuctionABI,
      provider
    );
    console.log(contract);
  }

  return (
    <div>
      <span className={className}>dogs</span>
    </div>
  );
};

const ActiveAuctionImage = ({
  tokenId,
  className,
}: {
  tokenId: string;
  className: string;
}) => {
  const { token: tokenMetadata } = useTokenMetadata(tokenId);

  return (
    <>
      {tokenMetadata && <img src={tokenMetadata.image} className={className} />}
    </>
  );
};

const AuctionTitleMetadata = ({ className }: { className: string }) => {
  const { data } = useActiveAuction();

  return (
    <>
      {data && (
        <span className={className}>
          {data?.collectionName} {data?.tokenId}
        </span>
      )}
    </>
  );
};

const AuctionPriceMetadata = ({ className }: { className: string }) => {
  const { data } = useActiveAuction();

  return (
    <>
      {data && (
        <span className={className}>
          {data.highestBidPrice} {data.highestBidCurrency}
        </span>
      )}
    </>
  );
};

const AuctionCountdown = ({ className }: { className: string }) => {
  const { data } = useActiveAuction();

  return data ? (
    <Countdown endTime={parseInt(data?.endTime)} className={className} />
  ) : (
    <></>
  );
};

const ActiveBids = ({ children }: { children: any }) => {
  const { data } = useActiveAuction();
  const { bids } = useBidsForToken(data?.tokenId);
  return children(bids);
};

ActiveAuction.SettleAuctionButton = SettleAuctionButton;
ActiveAuction.ActiveBids = ActiveBids;
ActiveAuction.Title = AuctionTitleMetadata;
ActiveAuction.Price = AuctionPriceMetadata;
ActiveAuction.Countdown = AuctionCountdown;

export default ActiveAuction;
