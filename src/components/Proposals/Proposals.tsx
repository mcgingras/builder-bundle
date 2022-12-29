import { useFetchProposals } from "../../hooks/useProposals";
import useBuilderContext from "../../hooks/useBuilderContext";

const Proposals = ({ children }: { children: any }) => {
  const context = useBuilderContext();
  const { proposals } = useFetchProposals(context?.governorAddress || "");

  return children(proposals);
};

export default Proposals;
