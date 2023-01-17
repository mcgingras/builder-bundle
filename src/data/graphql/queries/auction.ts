import gql from "graphql-tag";
import { AUCTION_FRAGMENT } from "./auctionFragment";

export const AUCTION_QUERY = gql`
  query auction($collectionAddress: String!, $tokenId: String!) {
    nouns {
      nounsMarkets(
        where: { tokens: { address: $collectionAddress, tokenId: $tokenId } }
      ) {
        nodes {
          ...AuctionParts
        }
      }
    }
  }
  ${AUCTION_FRAGMENT}
`;
