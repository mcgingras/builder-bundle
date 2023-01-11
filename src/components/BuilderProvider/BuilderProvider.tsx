import React from "react";
import { BuilderContext } from "../../store/builderContext";
import ContractProvider from "../ContractProvider/ContractProvider";

const BuilderProvider = ({
  collectionAddress,
  auctionAddress,
  governorAddress,
  children,
}: {
  collectionAddress: string;
  auctionAddress: string;
  governorAddress: string;
  children: React.ReactNode;
}) => {
  return (
    <BuilderContext.Provider
      value={{
        collectionAddress,
        auctionAddress,
        governorAddress,
      }}
    >
      <ContractProvider>{children}</ContractProvider>
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
