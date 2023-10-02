import axios from "axios";

const exchangeRateApi =
  "https://api.coinbase.com/v2/exchange-rates?currency=WETH";

export const getExchangeRates = () => {
  return axios.get(exchangeRateApi);
};
