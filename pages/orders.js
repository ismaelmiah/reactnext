import React, { useEffect, useState } from "react";
import {
  Grid,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { Layout } from "../components/Layout";
import router from "next/router";

const orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/getOrder")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        alert("Network Error!");
      });
  }, []);

  return (
    <Layout title="My Orders">
      <Typography variant="h1" align="center" component="h1">
        All Orders
      </Typography>
      <Grid container spacing={1}>
        <Slide direction="up" in={true}>
          <Grid container spacing={1}>
            <Grid item md={12}>
              <Grid container>
                <TableContainer>
                  <Table aria-label="Orders">
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                      </TableRow>
                    </TableHead>

                    {orders.length == 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          style={{ margin: "20px 0px" }}
                          align="center"
                        >
                          You didn't make any order previously
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow
                            key={order.date}
                            hover
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              router.push(`/orders/${order.id}`);
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {order.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {order.date}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Slide>
      </Grid>
    </Layout>
  );
};

export default orders;
