export const fetchData = (contract, decimals, handleEvent) => {
  console.log("fetch method");
  // setInterval(() => {
  //   handleEvent(
  //     Date.now(),
  //     Math.random(),
  //     Math.random() > 5 ? "sell" : "buy",
  //     "0xd3B4F5b4CF06498E4fBdD71c9da4F5bEFE01A0ed"
  //   );
  // }, 3000);
  contract.events
    .Swap(
      {
        fromBlock: "latest",
      },
      function (error, event) {
        console.log(error);
        console.log("before", event);
      }
    )
    .on("data", function (txData) {
      console.log("after", txData);
      const { txType, price, sender } = calculatePrice(decimals, txData);
      handleEvent(Date.now(), price, txType, sender);
    });
};

const calculatePrice = ({ dec0, dec1 }, txData) => {
  const { amount0In, amount0Out, amount1In, amount1Out, sender } =
    txData.returnValues;
  let txType, price;
  if (amount0In > 0) {
    txType = "sell";
    const amount1_out = Number(amount1Out) / Math.pow(10, Number(dec1));
    const amount0_in = Number(amount0In) / Math.pow(10, Number(dec0));

    price = amount1_out / amount0_in;
  } else {
    txType = "buy";
    const amount1_in = Number(amount1In) / Math.pow(10, Number(dec1));
    const amount0_out = Number(amount0Out) / Math.pow(10, Number(dec0));
    price = amount1_in / amount0_out;
  }
  return { txType, price, sender };
};
