import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import useBuilderContext from "./useBuilderContext";
import { ALL_AUCTIONS_QUERY } from "../data/queries/allAuctions";

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

export const useAuctions = () => {
  const context = useBuilderContext();
  const { data } = useSWR(
    `all-auctions-${context?.collectionAddress}`,
    async () =>
      fetcher(ALL_AUCTIONS_QUERY, {
        collectionAddresses: [context?.collectionAddress],
      })
  );

  // parse data into nicer format before returning int
  return { data };
};
