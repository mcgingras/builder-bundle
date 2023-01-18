import { ethers } from "ethers";
import { Bid } from "../../shared/types";

// none of the fields are indexed, so we can only fetch for all bids at once, which is not really great.
export const getBids = async (contract: any) => {
  const filter = contract.filters.AuctionBid(null, null, null, null, null);
  const events = await contract.queryFilter(filter);

  const bids = events.map((event: any) => {
    const [tokenId, bidder, amount, extended, endTime] = event.args;
    return {
      amount: ethers.utils.formatEther(amount),
      bidder,
      endTime,
      extended,
      tokenId: tokenId.toNumber(),
      transactionHash: event.transactionHash,
    } as Bid;
  });

  return bids;
};
