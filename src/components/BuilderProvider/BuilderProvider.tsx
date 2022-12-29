import React from "react";
import { BuilderContext } from "../../store/builderContext";

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
      {children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
