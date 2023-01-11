import gql from "graphql-tag";

// useful for getting the start and end range of an auction
// which is useful for fetching all of the bids for a particular token
export const AUCTION_RANGE_QUERY = gql`
  query GetAuctionRange($collectionAddresses: [String!]) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
          nounsBuilderAuctionEventType: NOUNS_BUILDER_AUCTION_AUCTION_CREATED_EVENT
        }
        networks: { network: ETHEREUM, chain: MAINNET }
        sort: { sortKey: CREATED, sortDirection: DESC }
        where: { collectionAddresses: $collectionAddresses }
      ) {
        nodes {
          properties {
            ... on NounsBuilderAuctionEvent {
              properties {
                ... on NounsBuilderAuctionAuctionCreatedEventProperties {
                  endTime
                  startTime
                  tokenId
                }
              }
            }
          }
        }
      }
    }
  }
`;
