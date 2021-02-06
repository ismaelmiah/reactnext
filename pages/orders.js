import React from "react";
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
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                      </TableRow>
                    </TableHead>

                    {orders.length == 0 ? (
                      <TableRow >
                        <TableCell colSpan={2} style={{margin: "20px 0px"}} align="center">
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
