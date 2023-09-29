import React from "react";
import TransactionsTable from "./TransactionsTable/TransactionsTable";
import LightWeightChart from "./LightWeightChart/LightWeightChart";
import Navbar from "../NavBar/Navbar";
import styles from "./TransactionsData.module.scss";

const TransactionsData = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.dataContainer}>
          <LightWeightChart />
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

export default TransactionsData;
