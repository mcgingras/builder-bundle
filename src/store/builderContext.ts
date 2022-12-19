import { createContext } from "react";
import { BuilderProviderContext } from "../shared/types";

export const BuilderContext = createContext<BuilderProviderContext | null>(
  null
);
