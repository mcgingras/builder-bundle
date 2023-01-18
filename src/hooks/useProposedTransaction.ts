import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const useProposedTransaction = (target: string, calldata: string) => {
  const url = `https://ether.actor/decode/${target}/${calldata}`;
  const { data, error, isLoading } = useSWR(
    calldata ? url : undefined,
    fetcher
  );

  return { data, error, isLoading };
};
