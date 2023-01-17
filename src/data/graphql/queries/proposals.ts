import gql from "graphql-tag";

export const ALL_PROPOSALS_QUERY = gql`
  query GetAllProposals($governorAddresses: [String!]) {
    nouns {
      nounsEvents(
        filter: {
          nounsBuilderGovernorEventType: NOUNS_BUILDER_GOVERNOR_PROPOSAL_CREATED_EVENT
          nounsEventTypes: NOUNS_BUILDER_GOVERNOR_EVENT
        }
        sort: { sortKey: CREATED, sortDirection: ASC }
        where: { governorAddresses: $governorAddresses }
      ) {
        nodes {
          eventType
          properties {
            ... on NounsBuilderGovernorEvent {
              __typename
              nounsBuilderGovernorEventType
              properties {
                ... on NounsBuilderGovernorProposalCreatedEventProperties {
                  __typename
                  description
                  proposer
                }
              }
              governor
            }
          }
        }
      }
    }
  }
`;
