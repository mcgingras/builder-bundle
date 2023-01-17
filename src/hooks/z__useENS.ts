import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useENS = (address: string) => {
  const [ensName, setENSName] = useState<string | null>(null);
  const [ensAvatar, setENSAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const resolveENS = async () => {
      setLoading(true);
      if (address && ethers.utils.isAddress(address)) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          let ensName = await provider.lookupAddress(address);
          const resolver = ensName ? await provider.getResolver(ensName) : null;
          let avatar = resolver ? await resolver.getAvatar() : null;
          setENSName(ensName);
          setENSAvatar(avatar && avatar.url);
        } finally {
          setLoading(false);
        }
      }
    };
    resolveENS();
  }, [address]);

  return { ensName, ensAvatar, loading };
};
