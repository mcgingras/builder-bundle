import useSWR from "swr";
import { DocumentNode } from "graphql";
import useBuilderContext from "./useBuilderContext";
import { CURRENT_AUCTION_QUERY } from "../data/graphql/queries/currentAuction";
import { graphlQLClient } from "../data/graphql/client";
import { toAuctionType } from "../shared/types";

/**
 * useActiveAuction
 * fetches the current active auction.
 */

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await graphlQLClient.request(query, vars);
    return toAuctionType(response.nouns.nounsActiveMarket);
  } catch (err) {
    console.error(err);
    throw new Error("Error");
  }
}

export const useActiveAuction = () => {
  const context = useBuilderContext();
  const { data } = useSWR(
    `current-auction-${context?.collectionAddress}`,
    async () =>
      fetcher(CURRENT_AUCTION_QUERY, {
        collectionAddress: context?.collectionAddress,
      })
  );

  return { data };
};
