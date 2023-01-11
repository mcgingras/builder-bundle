import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import useBuilderContext from "./useBuilderContext";
import { TOKEN_METADATA_QUERY } from "../data/queries/tokenMetadata";
import { Token } from "../shared/types";

export const client = new GraphQLClient("https://api.zora.co/graphql", {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await client.request(query, vars);
    return {
      description: response.token.token.description,
      name: response.token.token.metadata.name,
      image: response.token.token.metadata.image,
    } as Token;
  } catch (err) {
    console.error(err);
    return;
  }
}

// could think about adding auto refresh
// {
//   refreshInterval: xxxxms,
// }
export const useTokenMetadata = (tokenId: string | undefined) => {
  const context = useBuilderContext();
  const { data } = useSWR(
    tokenId ? `token-metadata-${tokenId}` : null,
    async () =>
      fetcher(TOKEN_METADATA_QUERY, {
        collectionAddress: context?.collectionAddress,
        tokenId,
      })
  );

  return { token: data };
};
