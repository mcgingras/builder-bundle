import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import { ALL_BIDS_QUERY } from "../data/queries/bids";

export const client = new GraphQLClient("https://api.zora.co/graphql", {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await client.request(query, vars);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const useBidsForToken = (auctionAddress: string, tokenId: number) => {
  const tokenIdString = String(tokenId);

  const { data } = useSWR(
    `current-auction-${auctionAddress}-${tokenId}`,
    async () =>
      fetcher(ALL_BIDS_QUERY, {
        auctionAddress,
      })
  );

  console.log(auctionAddress);
  console.log("data for bids", data);

  const results = data?.nouns?.nounsEvents?.nodes;
  const bids = results?.filter((result: any) => {
    return (
      result.eventType === "NOUNS_BUILDER_AUCTION_EVENT" &&
      result.properties.nounsBuilderAuctionEventType ===
        "NOUNS_BUILDER_AUCTION_AUCTION_BID_EVENT"
    );
  });

  const parsedBids = bids
    ?.map((bid: any) => {
      let data = bid.properties.properties;

      return {
        amount: data.amount,
        bidder: data.bidder,
        tokenId: data.tokenId,
      };
    })
    .filter((bid: any) => {
      return bid.tokenId === tokenIdString;
    });

  return { bids: parsedBids };
};
