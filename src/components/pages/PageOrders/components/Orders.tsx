import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_PATHS from "~/constants/apiPaths";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function Orders() {
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    axios.get(`${API_PATHS.order}/order`).then((res) => setOrders(res.data));
  }, []);

  const onDelete = (id: string) => {
    axios.delete(`${API_PATHS.order}/order/${id}`).then(() => {
      axios.get(`${API_PATHS.order}/order`).then((res) => setOrders(res.data));
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell align="right">Items count</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row">
                {order.address?.firstName} {order.address?.lastName}
              </TableCell>
              <TableCell align="right">{order.items.length}</TableCell>
              <TableCell align="right">{order.address?.address}</TableCell>
              <TableCell align="right">
                {order.statusHistory[
                  order.statusHistory.length - 1
                ].status.toUpperCase()}
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`/admin/order/${order.id}`}
                >
                  Manage
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => onDelete(order.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
