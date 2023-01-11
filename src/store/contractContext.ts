import { createContext } from "react";
import { ContractProviderContext } from "../shared/types";

export const ContractContext = createContext<ContractProviderContext | null>(
  null
);
