import gql from "graphql-tag";

// gets all bids for a particular contract and a particular range of time
// the range of time is useful for finding all the bids for a particular tokenId (if we know the range)
// we can find the arnge using the auctionRange query.
export const ALL_BIDS_QUERY = gql`
  query GetAllBids(
    $paginationLimit: Int!
    $collectionAddresses: [String!]
    $startDatetime: datetime
    $endDatetime: datetime
  ) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
          nounsBuilderAuctionEventType: NOUNS_BUILDER_AUCTION_AUCTION_BID_EVENT
          timeFilter: {
            startDatetime: $startDatetime
            endDatetime: $endDatetime
          }
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
