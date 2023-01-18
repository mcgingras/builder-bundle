import useSWR from "swr";
// import useSWRInfinite from "swr/infinite";
import useContractContext from "./useContractContext";
import { getBids } from "../data/bdk/auction";
import { Bid } from "../shared/types";

async function bidsFetcher(contract: any) {
  const bids = await getBids(contract);
  return bids;
}

export const useBidsForToken = (tokenId: string | undefined) => {
  const contractContext = useContractContext();
  const {
    data: bidData,
    error,
    isLoading,
  } = useSWR(contractContext?.governorContract ? `all-bids` : null, async () =>
    bidsFetcher(contractContext?.auctionContract)
  );

  const bidsForToken = bidData?.filter(
    (bid: Bid) => bid.tokenId === parseInt(tokenId || "")
  );

  return { bids: bidsForToken, error, isLoading };
};

export const useBidsForTokenIdInfinite = (_tokenId: string | undefined) => {
  // If we don't like the idea of getting all of the events (might not scale in the future)
  // we could experiment with using useSWR infinite hook to continue paging over the events query
  // until we've captured all of the tokenIds. I'm not sure if they are sorted by tokenId though
  // so we would still maybe have to get all of the pages to be sure we didn't miss any bids.
};
