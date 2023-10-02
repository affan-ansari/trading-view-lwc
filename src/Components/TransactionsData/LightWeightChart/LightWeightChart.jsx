/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Web3 from "web3";
// import { initialData } from "../../../Services/Data";
import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { erc_abi } from "../../../Services/erc20_abi";
import { uniswap_abi } from "../../../Services/uniswap_pair_v2_abi";
import { fetchData } from "../../../Services/fetchData";
import { fetchDecimals } from "../../../Services/decimalMethods";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDataPoints,
  updateChart,
  saveCurrentChart,
  selectSavedDataPoints,
  updateTable,
  saveExchangeRates,
  selectTableData,
} from "../../../reducers/chart/chartSlice";
import { cloneDeep } from "lodash";
import { selectCredentials } from "../../../reducers/credentials/credentialsSlice";
import { useNavigate } from "react-router-dom";
import styles from "./LightWeightChart.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Button } from "@mui/material";
import {
  latestPrice,
  latestPriceUsd,
  percentageDifference,
} from "../../../helperFunctions";
import { getExchangeRates } from "../../../Services/apis";

const colors = {
  backgroundColor: "#161825",
  lineColor: "#2962FF",
  textColor: "#d1d4dc",
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
  const navigate = useNavigate();

  const dataPoints = useSelector(selectDataPoints);
  const savedDataPoints = useSelector(selectSavedDataPoints);
  const credentials = useSelector(selectCredentials);
  const tableData = useSelector(selectTableData);

  const [play, setPlay] = useState(true);
  const [series, setSeries] = useState(null);
  const [newChart, setNewChart] = useState(null);
  const [symbols, setSymbols] = useState({});

  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const addDataPoint = (time, price, type, maker) => {
    dispatch(updateChart({ time: Math.floor(time / 1000), value: price }));
    dispatch(
      updateTable({
        date: formatter.format(time),
        type: type,
        priceUsd: price,
        priceEth: price, //converted inside the reducer
        maker: maker,
      })
    );
  };

  useEffect(() => {
    if (!credentials.infuraId || !credentials.pairAddress) {
      navigate("/");
    }
  }, [credentials]);

  useEffect(() => {
    if (series !== null && newChart !== null && play) {
      const next = cloneDeep(dataPoints[dataPoints.length - 1]);
      series.update(next);
      newChart.timeScale().fitContent();
    }
  }, [dataPoints]);

  useEffect(() => {
    if (series !== null && newChart !== null) {
      if (play) {
        const cleanDataPoints = cloneDeep(dataPoints);
        series.setData(cleanDataPoints);
        newChart.timeScale().fitContent();
      } else {
        const cleanDataPoints = cloneDeep(savedDataPoints);
        series.setData(cleanDataPoints);
        newChart.timeScale().fitContent();
      }
    }
  }, [play]);

  useEffect(() => {
    if (credentials.infuraId && credentials.pairAddress) {
      const myPriceFormatter = (p) => p.toExponential(4);
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        grid: {
          vertLines: { color: "#262734" },
          horzLines: { color: "#262734" },
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

      // newSeries.setData(initialData);
      if (dataPoints.length > 0 && play) {
        const cleanDataPoints = cloneDeep(dataPoints);
        newSeries.setData(cleanDataPoints);
      } else if (dataPoints.length > 0 && !play) {
        const cleanDataPoints = cloneDeep(savedDataPoints);
        newSeries.setData(cleanDataPoints);
      }
      setSeries(newSeries);
      setNewChart(chart);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);

        chart.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (credentials.infuraId && credentials.pairAddress) {
      // const infuraId = "f370c580e10c471cbe322f4674cd06c8"; // Replace with your Infura project ID
      // const pairAddress = "0xd3B4F5b4CF06498E4fBdD71c9da4F5bEFE01A0ed"; // Replace with the contract address of your pair
      const pairAbi = uniswap_abi;
      const erc20Abi = erc_abi;
      const web3 = new Web3(
        new Web3.providers.WebsocketProvider(
          `wss://mainnet.infura.io/ws/v3/${credentials.infuraId}`
        )
      );
      const pairContract = new web3.eth.Contract(
        pairAbi,
        credentials.pairAddress
      );

      getExchangeRates().then((response) => {
        dispatch(saveExchangeRates(response.data.data.rates));
        fetchDecimals(web3, pairContract, erc20Abi)
          .then((data) => {
            const { dec0, dec1, sym0, sym1 } = data;
            setSymbols({ sym0, sym1 });
            fetchData(pairContract, { dec0, dec1 }, addDataPoint);
          })
          .catch((error) => {
            console.error("Error fetching the decimals:", error);
          });
      });
      return () => {
        web3.currentProvider?.connection?.close();
      };
    }
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.btnContainer}>
          <Button
            variant="contained"
            startIcon={play ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={() => {
              if (play) {
                dispatch(saveCurrentChart());
              }
              setPlay(!play);
            }}
            className={play ? styles.playBtn : styles.pauseBtn}
          >
            {play ? "Pause" : "Play"}
          </Button>
        </div>
        <div className={styles.symbols}>
          <strong>{`${symbols.sym0 ? symbols.sym0 : "---"} / ${
            symbols.sym1 ? symbols.sym1 : "---"
          }`}</strong>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.price}>
            <strong>${latestPriceUsd(tableData)}</strong>
          </div>
          <div className={styles.latestData}>
            <div>
              {percentageDifference(play ? dataPoints : savedDataPoints)} %
            </div>
            <div>{latestPrice(play ? dataPoints : savedDataPoints)} ETH</div>
          </div>
        </div>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default LightWeightChart;
