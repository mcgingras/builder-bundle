import gql from "graphql-tag";

export const ALL_AUCTIONS_QUERY = gql`
  query currentAuction($collectionAddresses: [String!]) {
    nouns {
      nounsMarkets(
        where: { collectionAddresses: $collectionAddresses }
        sort: { sortKey: CREATED, sortDirection: DESC }
      ) {
        nodes {
          tokenId
          highestBidder
          highestBidPrice {
            chainTokenPrice {
              decimal
            }
          }
          endTime
          status
          winner
        }
      }
    }
  }
`;
