import { useProposals } from "../../hooks/useProposals";

const Proposals = ({ children }: { children: any }) => {
  const { data: proposals } = useProposals();

  return children(proposals);
};

export default Proposals;
