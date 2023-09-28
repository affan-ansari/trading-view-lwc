export const fetchDecimals = (web3, pairContract, erc20Abi) => {
  return Promise.all([
    getToken0Decimals(web3, pairContract, erc20Abi),
    getToken1Decimals(web3, pairContract, erc20Abi),
  ])
    .then(([dec0, dec1]) => {
      return {
        dec0,
        dec1,
      };
    })
    .catch((error) => {
      console.error("Error fetching decimals:", error);
    });
};

const getToken0Decimals = (web3, pairContract, erc20Abi) => {
  return pairContract.methods
    .token0()
    .call()
    .then((token0_address) => {
      const token0_contract = new web3.eth.Contract(erc20Abi, token0_address);
      return token0_contract.methods.decimals().call();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching token0 decimals:", error);
    });
};

const getToken1Decimals = (web3, pairContract, erc20Abi) => {
  return pairContract.methods
    .token1()
    .call()
    .then((token1_address) => {
      const token1_contract = new web3.eth.Contract(erc20Abi, token1_address);
      return token1_contract.methods.decimals().call();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching token1 decimals:", error);
    });
};
