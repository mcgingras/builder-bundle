import gql from "graphql-tag";

export const CURRENT_AUCTION_QUERY = gql`
  query currentAuction($collectionAddress: String!) {
    nouns {
      nounsActiveMarket(where: { collectionAddress: $collectionAddress }) {
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
        status
        winner
      }
      nounsDaos(where: { collectionAddresses: [$collectionAddress] }) {
        nodes {
          description
          name
          symbol
        }
      }
    }
  }
`;
