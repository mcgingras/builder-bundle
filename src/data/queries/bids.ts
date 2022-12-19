import gql from "graphql-tag";

/**
 * TODO: implement better filtering at the graphql layer to sort by event type and tokenId
 * Should be possible to get all bids for a certain tokenId without having to filter
 * outside of graphql
 *
 * 0x658d3a1b6dabcfbaa8b75cc182bf33efefdc200d
 */
export const ALL_BIDS_QUERY = gql`
  query ListCollections($auctionAddress: [String!]) {
    nouns {
      nounsEvents(
        where: { auctionAddresses: $auctionAddress }
        filter: { nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT }
      ) {
        nodes {
          eventType
          properties {
            ... on NounsBuilderAuctionEvent {
              __typename
              nounsBuilderAuctionEventType
              properties {
                ... on NounsBuilderAuctionAuctionBidEventProperties {
                  __typename
                  amount
                  bidder
                  amountPrice {
                    nativePrice {
                      decimal
                    }
                  }
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
