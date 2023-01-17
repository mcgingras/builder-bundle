// none of the fields are indexed, so we can only fetch for all bids at once, which is not really great.
export const getBidsForToken = async (contract: any) => {
  const filter = contract.filters.AuctionBid(null, null, null, null, null);
  const events = await contract.queryFilter(filter);
  return events;
};
