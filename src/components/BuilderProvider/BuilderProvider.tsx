import React from "react";
import { BuilderContext } from "../../store/builderContext";

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
      {children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
