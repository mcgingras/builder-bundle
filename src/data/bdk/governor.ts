export const getProposalState = async (contract: any, proposalId: string) => {
  const state = await contract.state(proposalId);
  return state;
};

export const getProposalData = async (contract: any, proposalId: string) => {
  const {
    proposer,
    timeCreated,
    againstVotes,
    forVotes,
    abstainVotes,
    voteStart,
    voteEnd,
    proposalThreshold,
    quorumVotes,
    executed,
    canceled,
    vetoed,
  } = await contract.getProposal(proposalId);

  return {
    proposer,
    timeCreated,
    againstVotes,
    forVotes,
    abstainVotes,
    voteStart,
    voteEnd,
    proposalThreshold,
    quorumVotes,
    executed,
    canceled,
    vetoed,
  };
};

export const getProposals = async (contract: any) => {
  try {
    const filter = contract.filters.ProposalCreated(
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );

    const events = await contract.queryFilter(filter);
    const proposalResponse = await Promise.all(
      events.map(async (event: any) => {
        const { proposalId, targets, calldatas, description, descriptionHash } =
          event.args as any;

        const [proposal, state] = await Promise.all([
          getProposalData(contract, proposalId),
          getProposalState(contract, proposalId),
        ]);

        // Get from array becuase of ethers naming collision
        const values = (event.args as any)[2];

        return {
          proposalId,
          targets,
          values,
          calldatas,
          description,
          descriptionHash,
          proposal,
          state,
        };
      })
    );

    return proposalResponse.sort(
      (a: any, b: any) => b.proposal.timeCreated - a.proposal.timeCreated
    );
  } catch (e) {
    console.error("error:", e);
    throw new Error("error");
  }
};
