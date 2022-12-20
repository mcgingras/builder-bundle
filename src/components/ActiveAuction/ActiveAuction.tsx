import React from "react";
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

ActiveAuction.ActiveBids = ActiveBids;
ActiveAuction.Title = AuctionTitleMetadata;
ActiveAuction.Price = AuctionPriceMetadata;
ActiveAuction.Countdown = AuctionCountdown;

export default ActiveAuction;
