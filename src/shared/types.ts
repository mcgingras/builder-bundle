export type BuilderProviderContext = {
  collectionAddress: string;
  auctionAddress: string;
  governorAddress: string;
};

export type ContractProviderContext = {
  governorContract: any;
};

export type Auction = {
  collectionName: string;
  collectionDescription: string;
  collectionSymbol: string;
  highestBidPrice: number;
  highestBidCurrency: string;
  tokenId: string;
  endTime: string;
};

export type Token = {
  image: string;
  description: string;
  name: string;
};

export type Proposal = {};
