import useSWR from "swr";
import { DocumentNode } from "graphql";
import useBuilderContext from "./useBuilderContext";
import { graphlQLClient } from "../data/graphql/client";
import { ALL_AUCTIONS_QUERY } from "../data/graphql/queries/allAuctions";

/**
 * useAuction
 * fetches all historical auctions.
 */

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await graphlQLClient.request(query, vars);
    return response;
  } catch (err) {
    console.error("error:", err);
    throw new Error("error");
  }
}

export const useAuctions = () => {
  const context = useBuilderContext();
  const { data, error, isLoading } = useSWR(
    `all-auctions-${context?.collectionAddress}`,
    async () =>
      fetcher(ALL_AUCTIONS_QUERY, {
        collectionAddresses: [context?.collectionAddress],
      })
  );

  return { data, error, isLoading };
};
