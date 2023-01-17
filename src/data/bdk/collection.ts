export const getFounders = async (contract: any) => {
  try {
    const founders = await contract.getFounders();
    return founders;
  } catch (e) {
    console.error("error:", e);
  }
};

export const getScheduledRecipient = async (contract: any, tokenId: number) => {
  try {
    const recipient = await contract.getScheduledRecipient(tokenId);
    return recipient;
  } catch (e) {
    console.error("error:", e);
  }
};
