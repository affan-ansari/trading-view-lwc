export const fetchData = (contract, decimals, handleEvent) => {
  console.log("fetch method");
  setInterval(() => {
    handleEvent(Math.floor(Date.now() / 1000), Math.random());
  }, 1000);
  // contract.events
  //   .Swap(
  //     {
  //       fromBlock: "latest",
  //     },
  //     function (error, event) {
  //       console.log(error);
  //       console.log("before", event);
  //     }
  //   )
  //   .on("data", function (txData) {
  //     console.log("after", txData);
  //     const { txType, price } = calculatePrice(decimals, txData);
  //     handleEvent(Date.now() / 1000, price);
  //   });
};

const calculatePrice = ({ dec0, dec1 }, txData) => {
  return { txType: "sell", price: 0.00052 };
};
// const calculatePrice = ({ dec0, dec1 }, txData) => {
//   const { amount0In, amount0Out, amount1In, amount1Out } = txData.returnValues;
//   let txType, price;
//   if (amount0In > 0) {
//     txType = "sell";
//     const amount1_out = Number(amount1Out) / Math.pow(10, Number(dec1));
//     const amount0_in = Number(amount0In) / Math.pow(10, Number(dec0));

//     price = amount1_out / amount0_in;
//   }
//   else {
//     txType = "buy";
//     const amount1_in = Number(amount1In) / Math.pow(10, Number(dec1));
//     const amount0_out = Number(amount0Out) / Math.pow(10, Number(dec0));
//     price = amount1_in / amount0_out;
//   }
//   return { txType, price };
// };
