import gql from "graphql-tag";

export const TOKEN_METADATA_QUERY = gql`
  query currentAuction($collectionAddress: String!, $tokenId: String!) {
    token(token: { address: $collectionAddress, tokenId: $tokenId }) {
      token {
        description
        metadata
      }
    }
  }
`;
