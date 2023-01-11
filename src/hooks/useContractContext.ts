import { useContext } from "react";
import { ContractContext } from "../store/contractContext";
import { ContractProviderContext } from "../shared/types";

/**
 * hook for accessing ContractContext
 */
const useContractContext = () => {
  const context = useContext<ContractProviderContext | null>(ContractContext);
  return context;
};

export default useContractContext;
