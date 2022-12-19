import { useContext } from "react";
import { BuilderContext } from "../store/builderContext";
import { BuilderProviderContext } from "../shared/types";

/**
 * hook for accessing BuilderContext
 */
const useBuilderContext = () => {
  const context = useContext<BuilderProviderContext | null>(BuilderContext);
  return context;
};

export default useBuilderContext;
