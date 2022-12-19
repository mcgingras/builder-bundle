import React from "react";
import { BuilderContext } from "../../store/builderContext";
import BuilderContextWagmiProvider from "../BuilderContextWagmiProvider";

const BuilderProvider = ({
  collectionAddress,
  auctionAddress,
  children,
}: {
  collectionAddress: string;
  auctionAddress: string;
  children: React.ReactNode;
}) => {
  return (
    <BuilderContext.Provider
      value={{
        collectionAddress,
        auctionAddress,
      }}
    >
      <BuilderContextWagmiProvider infuraApi={""} alchemyApi={""}>
        {children}
      </BuilderContextWagmiProvider>
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
