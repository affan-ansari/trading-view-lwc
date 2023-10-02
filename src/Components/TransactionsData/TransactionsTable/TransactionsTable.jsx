import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { selectTableData } from "../../../reducers/chart/chartSlice";

import styles from "./TransactionsTable.module.scss";

const headers = [
  { id: "date", label: "Date", minWidth: 120 },
  { id: "type", label: "Type" },
  { id: "priceUsd", label: "Price USD", align: "right" },
  { id: "priceEth", label: "Price ETH", align: "right" },
  { id: "maker", label: "Maker" },
];

const TransactionsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = useSelector(selectTableData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={styles.container}>
      <TableContainer className={styles.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headers.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={`${styles.cell} ${styles.headerCell}`}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    className={styles.dataRow}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.date}
                  >
                    {headers.map((header) => {
                      return (
                        <TableCell
                          className={styles.cell}
                          key={header.id}
                          align={header.align}
                        >
                          {row[header.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionsTable;
