import useSWR from "swr";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import useContractContext from "./useContractContext";
import useBuilderContext from "./useBuilderContext";
import { ALL_PROPOSALS_QUERY } from "../data/queries/proposals";
import { getProposalData, getProposals } from "../data/bdk/governor";

export const client = new GraphQLClient("https://api.zora.co/graphql", {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await client.request(query, vars);
    const results = response?.nouns?.nounsEvents?.nodes;
    const parsedProposals = results?.map((proposal: any) => {
      const data = proposal.properties.properties;
      const [title, body] = data.description.split("&&");

      return {
        proposer: data.proposer,
        title,
        body,
      };
    });

    return parsedProposals;
  } catch (err) {
    console.error(err);
  }
}

async function proposalFetcher(contract: any, proposalId: string) {
  const state = await getProposalData(contract, proposalId);
  return state;
}

async function proposalsFetcher(contract: any) {
  const proposals = await getProposals(contract);
  return proposals;
}

// fetch a single proposal by its ID
export const useProposal = (proposalId: string) => {
  const contractContext = useContractContext();
  const { data: proposalData } = useSWR(
    contractContext?.governorContract ? `proposal-state` : null,
    async () => proposalFetcher(contractContext?.governorContract, proposalId)
  );

  // possibly return error and loading? {data, loading, error}
  // could pull from swr
  return { data: proposalData };
};

export const useProposals = () => {
  const contractContext = useContractContext();
  const { data: proposalsData } = useSWR(
    contractContext?.governorContract ? `proposals-` : null,
    async () => proposalsFetcher(contractContext?.governorContract)
  );

  // todo: data, error, loading
  return { data: proposalsData };
};

// fetch all proposals (deprecated)
// the graphql API was not returning state data correctly
export const useProposalsDeprecated = () => {
  const context = useBuilderContext();

  const { data } = useSWR(`proposals-${context?.governorAddress}`, async () =>
    fetcher(ALL_PROPOSALS_QUERY, {
      governorAddresses: [context?.governorAddress],
    })
  );

  return { proposals: data };
};
