import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import { ALL_PROPOSALS_QUERY } from "../data/queries/proposals";

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

export const useFetchProposals = (governorAddress: string) => {
  console.log("addy", governorAddress);
  const { data } = useSWR(`proposals-${governorAddress}`, async () =>
    fetcher(ALL_PROPOSALS_QUERY, { governorAddresses: [governorAddress] })
  );

  const results = data?.nouns?.nounsEvents?.nodes;
  const parsedProposals = results?.map((proposal: any) => {
    const data = proposal.properties.properties;
    const [title, body] = data.description.split("&&");

    return {
      proposer: data.proposer,
      title,
      body,
    };
  });

  return { proposals: parsedProposals };
};
