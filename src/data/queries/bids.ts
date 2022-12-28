import gql from "graphql-tag";

/**
 * TODO: implement better filtering at the graphql layer to sort by event type and tokenId
 * Should be possible to get all bids for a certain tokenId without having to filter
 * outside of graphql
 *
 * 0x658d3a1b6dabcfbaa8b75cc182bf33efefdc200d
 */
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
