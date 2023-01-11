import React from "react";
import { useAuctions } from "../../hooks/useAuctions";
import useBuilderContext from "../../hooks/useBuilderContext";

const Auctions = ({ className }: { className: string }) => {
  const context = useBuilderContext();
  const { data } = useAuctions(context?.collectionAddress || "", 49);
  console.log("data", data);

  return (
    <>
      <p>hello</p>
    </>
  );
};

export default Auctions;
