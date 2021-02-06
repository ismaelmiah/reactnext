import React from "react";
import Link from "next/link";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from '@material-ui/icons/Info';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
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

export const getStaticProps = async (context) => {
  return {
    props: {
      orders: data,
    },
  };
};

const orders = ({ orders }) => {
  //console.log("Orders - ", orders);
  orders.map((item) => {
    console.log(item, " order");
  });
  return (
    <Layout>
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
                      {orders.map((order) =>
                        order.orders.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                              {order.date}
                            </TableCell>
                            <TableCell align="right">
                              {order.quantity}
                            </TableCell>
                            <TableCell align="right">{order.total}</TableCell>
                            <TableCell align="right">
                              <Button color="primary" onClick={() => {}}>
                                <InfoIcon />
                              </Button>
                              <Button color="secondary">
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
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
