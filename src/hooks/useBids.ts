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
      console.log(data);

      return {
        transactionHash: bid.transactionInfo.transactionHash,
        amount: data.amountPrice.chainTokenPrice.decimal,
        bidder: truncateString(data.bidder, 4),
        tokenId: data.tokenId,
      };
    })
    .filter((bid: any) => {
      return bid.tokenId === tokenIdString;
    });

  return { bids: parsedBids };
};
