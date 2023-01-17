import useSWR from "swr";
import { DocumentNode } from "graphql";
import { graphlQLClient } from "../data/graphql/client";
import useBuilderContext from "./useBuilderContext";
import { TOKEN_METADATA_QUERY } from "../data/graphql/queries/tokenMetadata";
import { Token } from "../shared/types";

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await graphlQLClient.request(query, vars);
    return {
      description: response.token.token.description,
      name: response.token.token.metadata.name,
      image: response.token.token.metadata.image,
    } as Token;
  } catch (err) {
    console.error(err);
    throw new Error("error");
  }
}

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
