import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import {
  Button,
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
import data from "../utils/order.json";

import { Layout } from "../components/Layout";
import router from "next/router";

export const getStaticProps = async () => {
  return {
    props: {
      orders: data,
    },
  };
};

const removeOrder = (orderId) => {
  alert(orderId);
};

const orders = ({ orders }) => {
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
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Products Quantity</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell component="th" scope="row" align="right">
                            {order.date}
                          </TableCell>
                          <TableCell align="right">{order.quantity}</TableCell>
                          <TableCell align="right">{order.total}</TableCell>
                          <TableCell align="right">
                            <Button
                              color="primary"
                              onClick={() => {
                                router.push(`/orders/${order.id}`);
                              }}
                            >
                              <InfoIcon />
                            </Button>
                            <Button
                              color="secondary"
                              onClick={() => removeOrder(order.id)}
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
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
