import Web3 from "web3";

export const fetchData = (
  infuraId,
  pairAddress,
  pairAbi,
  erc20Abi,
  handleEvent
) => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      `wss://mainnet.infura.io/ws/v3/${infuraId}`
    )
  );
  const pairContract = new web3.eth.Contract(pairAbi, pairAddress);
  const swapEvent = pairContract.events.Swap;

  console.log(`Starting event loop for ${pairAddress}`);

  const eventFilter = swapEvent.createFilter({ fromBlock: "latest" });

  eventFilter.watch((error, event) => {
    if (error) {
      console.error("Error:", error);
    } else {
      const tHash = event.transactionHash;
      console.log(`Received event for tx: ${tHash}`);
      try {
        handleEvent(event);
      } catch (e) {
        console.error(`Error while processing ${tHash}`);
        console.error(e);
      }
    }
  });

  return () => {
    eventFilter.stopWatching(); // Cleanup the event filter when necessary
  };
};
