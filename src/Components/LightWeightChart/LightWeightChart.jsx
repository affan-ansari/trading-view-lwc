import React, { useState } from "react";
import Web3 from "web3";
// import { initialData } from "../../Services/Data";
import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { erc_abi } from "../../Services/erc20_abi";
import { uniswap_abi } from "../../Services/uniswap_pair_v2_abi";
import { fetchData } from "../../Services/fetchData";
import { fetchDecimals } from "../../Services/decimalMethods";
import { useSelector, useDispatch } from "react-redux";
import { selectDataPoints, updateChart } from "../../reducers/chart/chartSlice";
import { cloneDeep } from "lodash";
const colors = {
  backgroundColor: "white",
  lineColor: "#2962FF",
  textColor: "black",
  areaTopColor: "#2962FF",
  areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

const LightWeightChart = () => {
  const {
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  } = colors;
  const chartContainerRef = useRef();
  const dispatch = useDispatch();
  const dataPoints = useSelector(selectDataPoints);
  const addDataPoint = (time, price) => {
    console.log("NEW DATA POINT", { time, price });
    dispatch(updateChart({ time: time, value: price }));
  };

  useEffect(() => {
    console.log("CHAR UE");
    const myPriceFormatter = (p) => p.toExponential(4);
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
      localization: {
        priceFormatter: myPriceFormatter,
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.applyOptions({
      priceFormat: {
        type: "price",
        // precision: 16,
        minMove: 0.1e-12,
      },
    });

    if (dataPoints.length > 0) {
      const cleanDataPoints = cloneDeep(dataPoints);
      newSeries.setData(cleanDataPoints);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
    dataPoints,
  ]);

  useEffect(() => {
    const infuraId = "f370c580e10c471cbe322f4674cd06c8"; // Replace with your Infura project ID
    const pairAddress = "0x0f197ad4E350e0c7805821d41EE5AA51acF6559E"; // Replace with the contract address of your pair
    const pairAbi = uniswap_abi;
    const erc20Abi = erc_abi;
    console.log("UE");
    const web3 = new Web3(
      new Web3.providers.WebsocketProvider(
        `wss://mainnet.infura.io/ws/v3/${infuraId}`
      )
    );
    const pairContract = new web3.eth.Contract(pairAbi, pairAddress);
    fetchDecimals(web3, pairContract, erc20Abi)
      .then((decimals) => {
        console.log(decimals);
        fetchData(pairContract, decimals, addDataPoint);
      })
      .catch((error) => {
        console.error("Error fetching the decimals:", error);
      });
    // return () => web3.currentProvider.connection.close();
  }, []);

  return <div ref={chartContainerRef} />;
};

export default LightWeightChart;
