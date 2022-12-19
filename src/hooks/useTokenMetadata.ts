import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import { TOKEN_METADATA_QUERY } from "../data/queries/tokenMetadata";

export const client = new GraphQLClient("https://api.zora.co/graphql", {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await client.request(query, vars);
    return response;
  } catch (err) {
    console.error(err);
  }
}

// could think about adding auto refresh
// {
//   refreshInterval: xxxxms,
// }
export const useTokenMetadata = (
  collectionAddress: string,
  tokenId: string
) => {
  const { data } = useSWR(`token-metadata-${tokenId}`, async () =>
    fetcher(TOKEN_METADATA_QUERY, {
      collectionAddress,
      tokenId,
    })
  );

  return { data };
};
