import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import useBuilderContext from "./useBuilderContext";
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

export const useAuction = () => {
  const context = useBuilderContext();
  const { data } = useSWR(
    `current-auction-${context?.collectionAddress}`,
    async () =>
      fetcher(CURRENT_AUCTION_QUERY, {
        collectionAddress: context?.collectionAddress,
      })
  );

  // parse data into nicer format before returning int
  return { data };
};
