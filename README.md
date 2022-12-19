![Group 6](https://user-images.githubusercontent.com/12549482/207696728-e92dbf32-dc87-4001-8bc1-15ab96dcc577.svg)

Unopinionated, unstyled, UI components for the Nouns Builder ecosystem.

---

## Getting Started

```bash
npm install builder-bundle
```

Import `BuilderProvider` and the components you want to use from `builder-bundle`.
Here's an example using tailwindcss to style the components.

```javascript
import { BuilderProvider, ActiveAuction } from "builder-bundle";

const BUILDER_COLLECTION_ADDRESS = "0xdf9b7d26c8fc806b1ae6273684556761ff02d422";
const BUILDER_AUCTION_ADDRESS = "0x658d3a1b6dabcfbaa8b75cc182bf33efefdc200d";

const Example = () => {
  return (
    <BuilderProvider
      collectionAddress={BUILDER_COLLECTION_ADDRESS}
      auctionAddress={BUILDER_AUCTION_ADDRESS}
    >
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
          </div>
        </div>
      </div>
    </BuilderProvider>
  );
};

export default Example;
```

## Examples

Check out the `/examples` for some examples of builder bundle in action.

## Next.js Incompatibility

Builder-bundle uses a few 3rd party libraries that are only compatible with ES modules. Since next.js attempts to build server-side, without ES module support, builder-bundle components fail. Future releases will find ways around this (possibly pulling out the incompatible 3rd party libraries). Builder-bundle hopes to be compatible with next.js soon. If you have any familiarity with these sorts of problems, please leave an issue or a PR!
