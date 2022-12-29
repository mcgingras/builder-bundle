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

export const useBidsForToken = (collectionAddress: string, tokenId: number) => {
  const tokenIdString = String(tokenId);

  const { data } = useSWR(`bids-${collectionAddress}-${tokenId}`, async () =>
    fetcher(ALL_BIDS_QUERY, {
      collectionAddresses: [collectionAddress],
      paginationLimit: 5,
    })
  );

  const results = data?.nouns?.nounsEvents?.nodes;
  console.log("data", results);

  const parsedBids = results
    ?.map((bid: any) => {
      let data = bid.properties.properties;

      return {
        amount: data.amountPrice.chainTokenPrice.decimal,
        bidder: data.bidder,
        tokenId: data.tokenId,
      };
    })
    .filter((bid: any) => {
      return bid.tokenId === tokenIdString;
    });

  return { bids: parsedBids };
};
