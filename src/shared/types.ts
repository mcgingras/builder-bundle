export type BuilderProviderContext = {
  collectionAddress: string;
  auctionAddress: string;
  governorAddress: string;
};

export type ContractProviderContext = {
  governorContract: any;
  auctionContract: any;
  collectionContract: any;
};

export type Auction = {
  tokenId: string;
  highestBidPrice: number;
  highestBidCurrency: string;
  startTime: number | null;
  endTime: number | null;
  winner: string;
  status: string;
};

export const toFounderAuctionType = (
  recipient: [string, string, string] | undefined,
  tokenId: string
) => {
  if (recipient) {
    const [address, _ownershipPct, _vestExpirary] = recipient;
    return {
      tokenId,
      highestBidPrice: 0,
      highestBidCurrency: "ETH", // not always true
      startTime: null, // need to figure better way of doing this but we can ignore
      endTime: null, // need to figure better way of doing this but we can ignore
      winner: address,
      status: "ENDED",
    } as Auction;
  }
  return {} as Auction;
};

export const toAuctionType = (response: any) => {
  return {
    ...response,
    highestBidPrice: response.highestBidPrice.nativePrice.decimal,
    highestBidCurrency: response.highestBidPrice.nativePrice.currency.name,
  } as Auction;
};

export type Collection = {
  description: string;
  name: string;
  symbol: string;
};

export type Token = {
  image: string;
  description: string;
  name: string;
};

export type Bid = {
  bidder: string;
  amount: string;
  tokenId: number;
  transactionHash: string;
};

export type Proposal = {
  proposalId: string;
  title: string;
  description: string;
  author: string;
  createdAt: number;
  voteStart: string;
  voteEnd: string;
  state:
    | "Pending"
    | "Active"
    | "Cancelled"
    | "Defeated"
    | "Succeeded"
    | "Queued"
    | "Expired"
    | "Executed"
    | "Vetoed";
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  targets: string[];
  values: number[];
  calldatas: string[];
};

const stateToType = (stateId: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => {
  const stateMap = {
    0: "Pending",
    1: "Active",
    2: "Cancelled",
    3: "Defeated",
    4: "Succeeded",
    5: "Queued",
    6: "Expired",
    7: "Executed",
    8: "Vetoed",
  };

  return stateMap[stateId];
};

export const toProposalType = (response: any) => {
  const [title, description] = response.description.split("&&");
  return {
    proposalId: response.proposalId,
    title,
    description,
    author: response.proposal.proposer,
    forVotes: response.proposal.forVotes,
    againstVotes: response.proposal.againstVotes,
    abstainVotes: response.proposal.abstainVotes,
    createdAt: response.proposal.timeCreated,
    voteStart: response.proposal.voteStart,
    voteEnd: response.proposal.voteEnd,
    state: stateToType(response.state),
    targets: response.targets,
    values: response.values,
    calldatas: response.calldatas,
  } as Proposal;
};
