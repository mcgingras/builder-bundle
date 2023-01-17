import useSWR from "swr";
import { DocumentNode } from "graphql";
import useContractContext from "./useContractContext";
import useBuilderContext from "./useBuilderContext";
import { getScheduledRecipient } from "../data/bdk/collection";
import { graphlQLClient } from "../data/graphql/client";
import { AUCTION_QUERY } from "../data/graphql/queries/auction";
import { toAuctionType, toFounderAuctionType } from "../shared/types";

/**
 * useAuction
 * fetches an auction by an auctionId.
 */

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await graphlQLClient.request(query, vars);
    return toAuctionType(response.nouns.nounsMarkets.nodes[0]);
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function scheduledRecipientFetcher(contract: any, tokenId: number) {
  const recipient = await getScheduledRecipient(contract, tokenId);
  return recipient;
}

export const useAuction = (tokenId: string) => {
  const context = useBuilderContext();
  const contractContext = useContractContext();

  const { data } = useSWR(
    contractContext?.collectionContract
      ? `auction-${context?.collectionAddress}-${tokenId}`
      : null,
    async () =>
      fetcher(AUCTION_QUERY, {
        collectionAddress: context?.collectionAddress,
        tokenId: tokenId,
      })
  );

  const { data: recipientData } = useSWR(
    contractContext?.collectionContract ? `recipient-${tokenId}` : null,
    async () =>
      scheduledRecipientFetcher(
        contractContext?.collectionContract,
        parseInt(tokenId)
      )
  );

  // still need a way to figure out how to get start and end time for founder auctions.
  // one possibility is recognizing that the founder auctions occur at the same time as the
  // preceding auction. For example, tokens 0 and 1 occur at the same time as 2.
  // Problem is that we would have to optimistically fetch n tokens ahead where n is the
  // amount of funders in order for us to know the start date at n token's time.
  // this seems silly and I'm hopeful there's an easier way.
  // Since this is such a small feature I'm not sure worried about it for now,
  // but leaving this note here for future self.
  if (!data) {
    const founderAuction = toFounderAuctionType(recipientData, tokenId);
    return { data: founderAuction };
  }

  return { data };
};
