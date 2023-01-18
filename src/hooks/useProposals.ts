import useSWR from "swr";
import { DocumentNode } from "graphql";
import useContractContext from "./useContractContext";
import useBuilderContext from "./useBuilderContext";
import { graphlQLClient } from "../data/graphql/client";
import { ALL_PROPOSALS_QUERY } from "../data/graphql/queries/proposals";
import { getProposals } from "../data/bdk/governor";
import { toProposalType } from "../shared/types";

async function fetcher(query: DocumentNode, vars?: any) {
  try {
    const response = await graphlQLClient.request(query, vars);
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
    console.error("error:", err);
    throw new Error("error");
  }
}

async function proposalsFetcher(contract: any) {
  const proposals = await getProposals(contract);
  const parsedProposals = proposals?.map((p: any) => toProposalType(p));
  return parsedProposals;
}

export const useProposals = () => {
  const contractContext = useContractContext();

  const {
    data: proposalsData,
    error,
    isLoading,
  } = useSWR(contractContext?.governorContract ? `proposals` : null, async () =>
    proposalsFetcher(contractContext?.governorContract)
  );

  // todo: data, error, loading
  return { data: proposalsData, error, isLoading };
};

// ------------------------------------------------------
// DEPRECATED
// ------------------------------------------------------
// fetch all proposals (deprecated)
// the graphql API was not returning state data correctly
export const useProposalsDeprecated = () => {
  const context = useBuilderContext();

  const { data, error, isLoading } = useSWR(
    `proposals-${context?.governorAddress}`,
    async () =>
      fetcher(ALL_PROPOSALS_QUERY, {
        governorAddresses: [context?.governorAddress],
      })
  );

  return { proposals: data, error, isLoading };
};
