import React from "react";
import { ethers } from "ethers";
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
  const { data } = useAuction(context?.collectionAddress || "");
  const activeMarket = data?.nouns?.nounsActiveMarket;
  const tokenId = activeMarket?.tokenId;
  const { bids } = useBidsForToken(context?.collectionAddress || "", tokenId);
  console.log("bids", bids);
  return children(bids);
};

ActiveAuction.SettleAuctionButton = SettleAuctionButton;
ActiveAuction.ActiveBids = ActiveBids;
ActiveAuction.Title = AuctionTitleMetadata;
ActiveAuction.Price = AuctionPriceMetadata;
ActiveAuction.Countdown = AuctionCountdown;

export default ActiveAuction;
