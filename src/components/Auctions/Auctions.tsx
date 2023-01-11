import React from "react";
import { useAuctions } from "../../hooks/useAuctions";
// import useBuilderContext from "../../hooks/useBuilderContext";

const Auctions = ({ className }: { className: string }) => {
  // const context = useBuilderContext();
  const { data } = useAuctions();
  console.log("data", data);

  return (
    <>
      <p className={className}>hello</p>
    </>
  );
};

export default Auctions;
