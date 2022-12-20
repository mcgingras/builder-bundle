import { BuilderProvider, ActiveAuction } from "builder-bundle";

const BUILDER_COLLECTION_ADDRESS = "0xdf9b7d26c8fc806b1ae6273684556761ff02d422";
const BUILDER_AUCTION_ADDRESS = "0x658d3a1b6dabcfbaa8b75cc182bf33efefdc200d";

const Pronouns = () => {
  return (
    <BuilderProvider
      collectionAddress={BUILDER_COLLECTION_ADDRESS}
      auctionAddress={BUILDER_AUCTION_ADDRESS}
    >
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
        <div className="grid grid-cols-4 gap-4 w-[1200px]">
          <div className="col-span-2">
            <span className="block mb-2">
              <ActiveAuction.Title className="text-3xl font-bold text-white" />
            </span>
            <ActiveAuction className="w-full rounded" />
          </div>
          <div className="border border-gray-700 p-4 rounded self-start">
            <span className="rounded bg-yellow-400 p-2 block flex flex-col text-center">
              <span>Time left</span>
              <ActiveAuction.Countdown className="text-xl" />
            </span>
            <span className="rounded bg-gray-400 p-2 block flex flex-col text-center mt-4">
              <span>Top bid</span>
              <ActiveAuction.Price className="text-xl" />
            </span>
          </div>
          <div className="border border-gray-700 p-4 self-start rounded">
            <span className="text-white mb-2 block">Bid controls</span>
            <ActiveAuction.PlaceBidInput className="w-full bg-green-400 px-2 rounded" />
          </div>
        </div>
      </div>
    </BuilderProvider>
  );
};

export default Pronouns;
