import React from "react";
import { initialData } from "../../Services/Data";
import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { fetchData } from "../../Services/fetchData";

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

  const addDataPoint = (e) => {
    // ADD DATA POINTS TO CHART
  };

  useEffect(() => {
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
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    const data = initialData.map((item) => ({
      ...item,
      time: new Date(item.time).getTime() / 1000,
    }));
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  useEffect(() => {
    const infuraId = "YOUR_INFURA_PROJECT_ID"; // Replace with your Infura project ID
    const pairAddress = "YOUR_PAIR_CONTRACT_ADDRESS"; // Replace with the contract address of your pair
    const pairAbi = []; // Replace with the ABI of your pair contract
    const erc20Abi = []; // Replace with the ABI of your ERC-20 contract

    // const cleanup = fetchData(
    //   infuraId,
    //   pairAddress,
    //   pairAbi,
    //   erc20Abi,
    //   addDataPoint
    // );

    return () => {
      // cleanup();
    };
  }, []);

  return <div ref={chartContainerRef} />;
};

export default LightWeightChart;
