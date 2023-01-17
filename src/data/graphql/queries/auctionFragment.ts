import gql from "graphql-tag";

export const AUCTION_FRAGMENT = gql`
  fragment AuctionParts on NounsBuilderAuction {
    tokenId
    duration
    endTime
    extended
    highestBidPrice {
      nativePrice {
        decimal
        currency {
          name
        }
      }
    }
    highestBidder
    minBidIncrementPercentage
    networkInfo {
      chain
      network
    }
    startTime
    status
    winner
  }
`;
