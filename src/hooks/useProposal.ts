import useSWR from "swr";
import useContractContext from "./useContractContext";
import { getProposalData } from "../data/bdk/governor";

async function proposalFetcher(contract: any, proposalId: string) {
  const state = await getProposalData(contract, proposalId);
  return state;
}

// fetch a single proposal by its ID
export const useProposal = (proposalId: string) => {
  const contractContext = useContractContext();
  const {
    data: proposalData,
    error,
    isLoading,
  } = useSWR(
    contractContext?.governorContract ? `proposal-state` : null,
    async () => proposalFetcher(contractContext?.governorContract, proposalId)
  );

  // possibly return error and loading? {data, loading, error}
  return { data: proposalData, error, isLoading };
};
