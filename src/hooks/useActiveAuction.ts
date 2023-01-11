import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import useBuilderContext from "./useBuilderContext";
import { CURRENT_AUCTION_QUERY } from "../data/queries/currentAuction";
import { Auction } from "../shared/types";

export const client = new GraphQLClient("https://api.zora.co/graphql", {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await client.request(query, vars);

    return {
      ...response.nouns.nounsActiveMarket,
      highestBidCurrency:
        response.nouns.nounsActiveMarket.highestBidPrice.nativePrice.currency
          .name,
      highestBidPrice:
        response.nouns.nounsActiveMarket.highestBidPrice.nativePrice.decimal,
      collectionDescription: response.nouns.nounsDaos.nodes[0].description,
      collectionName: response.nouns.nounsDaos.nodes[0].name,
      collectionSymbol: response.nouns.nounsDaos.nodes[0].symbol,
    } as Auction;
  } catch (err) {
    console.error(err);
    return;
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
