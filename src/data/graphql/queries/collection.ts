import gql from "graphql-tag";

export const COLLECTION_QUERY = gql`
  query currentAuction($collectionAddress: String!) {
    nouns {
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
