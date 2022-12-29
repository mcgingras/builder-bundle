import gql from "graphql-tag";

export const ALL_BIDS_QUERY = gql`
  query GetAllBids($paginationLimit: Int!, $collectionAddresses: [String!]) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
          nounsBuilderAuctionEventType: NOUNS_BUILDER_AUCTION_AUCTION_BID_EVENT
        }
        networks: { network: ETHEREUM, chain: MAINNET }
        sort: { sortKey: CREATED, sortDirection: DESC }
        where: { collectionAddresses: $collectionAddresses }
        pagination: { limit: $paginationLimit }
      ) {
        nodes {
          collectionAddress
          transactionInfo {
            blockNumber
            transactionHash
          }
          properties {
            ... on NounsBuilderAuctionEvent {
              __typename
              nounsBuilderAuctionEventType
              properties {
                ... on NounsBuilderAuctionAuctionBidEventProperties {
                  __typename
                  bidder
                  tokenId
                  amountPrice {
                    chainTokenPrice {
                      decimal
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
