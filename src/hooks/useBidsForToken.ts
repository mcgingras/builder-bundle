import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import useBuilderContext from "./useBuilderContext";
import { AUCTION_RANGE_QUERY } from "../data/queries/auctionRange";
import { ALL_BIDS_QUERY } from "../data/queries/bids";

export const client = new GraphQLClient("https://api.zora.co/graphql", {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});

const truncateString = (str: string, len: number) => {
  return (
    str.substring(0, len) + "..." + str.substring(str.length - len, str.length)
  );
};

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await client.request(query, vars);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const useBidsForTokenId = (tokenId: string | undefined) => {
  const context = useBuilderContext();
  const { data: auctionRanges } = useSWR(
    `auction-events-${context?.collectionAddress}`,
    async () =>
      fetcher(AUCTION_RANGE_QUERY, {
        collectionAddresses: [context?.collectionAddress],
        paginationLimit: 5,
      })
  );

  const ranges = auctionRanges?.nouns?.nounsEvents?.nodes;
  const range = ranges?.find((range: any) => {
    return range.properties.properties.tokenId === String(tokenId);
  });

  let tempStartDatetime = 0;
  let tempEndDatetime = 100000000000000; // huge block?

  const { data: bids } = useSWR(
    `bids-${context?.collectionAddress}-${tokenId}`,
    async () =>
      fetcher(ALL_BIDS_QUERY, {
        collectionAddresses: [context?.collectionAddress],
        paginationLimit: 20,
        startDatetime:
          range.properties.properties.startTime ?? tempStartDatetime,
        endDatetime: range.properties.properties.endTime ?? tempEndDatetime,
      })
  );

  const results = bids?.nouns?.nounsEvents?.nodes;

  const parsedBids = results?.map((bid: any) => {
    let data = bid.properties.properties;

    return {
      transactionHash: bid.transactionInfo.transactionHash,
      amount: data.amountPrice.chainTokenPrice.decimal,
      bidder: truncateString(data.bidder, 4),
      tokenId: data.tokenId,
    };
  });

  return { bids: parsedBids };
};

export const useBidsForToken = (tokenId: string | undefined) => {
  const context = useBuilderContext();

  const { data } = useSWR(
    `bids-${context?.collectionAddress}-${tokenId}`,
    async () =>
      fetcher(ALL_BIDS_QUERY, {
        collectionAddresses: [context?.collectionAddress],
        paginationLimit: 5,
      })
  );

  const results = data?.nouns?.nounsEvents?.nodes;

  const parsedBids = results
    ?.map((bid: any) => {
      let data = bid.properties.properties;
      console.log(data);

      return {
        transactionHash: bid.transactionInfo.transactionHash,
        amount: data.amountPrice.chainTokenPrice.decimal,
        bidder: truncateString(data.bidder, 6),
        tokenId: data.tokenId,
      };
    })
    .filter((bid: any) => {
      return bid.tokenId === tokenId;
    });

  return { bids: parsedBids };
};
