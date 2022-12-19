import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import { CURRENT_AUCTION_QUERY } from "../data/queries/currentAuction";

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

export const useAuction = (collectionAddress: string) => {
  const { data } = useSWR(`current-auction-${collectionAddress}`, async () =>
    fetcher(CURRENT_AUCTION_QUERY, {
      collectionAddress,
    })
  );

  // parse data into nicer format before returning int
  return { data };
};
