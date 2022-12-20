import { BuilderProvider, ActiveAuction } from "builder-bundle";

const BUILDER_COLLECTION_ADDRESS = "0xdf9b7d26c8fc806b1ae6273684556761ff02d422";
const BUILDER_AUCTION_ADDRESS = "0x658d3a1b6dabcfbaa8b75cc182bf33efefdc200d";

const Basic = () => {
  return (
    <BuilderProvider
      collectionAddress={BUILDER_COLLECTION_ADDRESS}
      auctionAddress={BUILDER_AUCTION_ADDRESS}
    >
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        <div className="grid grid-cols-2 gap-6 border rounded shadow-lg bg-white px-6 py-6">
          <ActiveAuction className="w-96 h-96 rounded" />
          <div className="space-y-8">
            <ActiveAuction.Title className="text-3xl font-bold" />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col">
                <label className="text-gray-400">Current bid</label>
                <ActiveAuction.Price className="text-xl" />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400">Auction ends in</label>
                <ActiveAuction.Countdown className="text-xl" />
              </div>
            </div>

            <ActiveAuction.ActiveBids>
              {(bids: any) => (
                <>
                  <button className="w-full bg-gray-100 px-2 py-2 rounded">
                    Bid History
                  </button>
                </>
              )}
            </ActiveAuction.ActiveBids>
          </div>
        </div>
      </div>
    </BuilderProvider>
  );
};

export default Basic;
