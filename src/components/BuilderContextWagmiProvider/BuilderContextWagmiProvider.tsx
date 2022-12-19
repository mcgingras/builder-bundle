import React from "react";
import {
  configureChains,
  createClient,
  mainnet,
  goerli,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const BuilderContextWagmiProvider = ({
  infuraApi,
  alchemyApi,
  children,
}: {
  infuraApi?: string;
  alchemyApi?: string;
  children: React.ReactNode;
}) => {
  if (infuraApi || alchemyApi) {
    // pass, later
  }
  const { provider, webSocketProvider } = configureChains(
    [mainnet, goerli],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};

export default BuilderContextWagmiProvider;
