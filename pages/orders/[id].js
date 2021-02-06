import orders from "../../utils/order.json";
import React from "react";
import { Layout } from "../../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

export const getStaticPaths = async () => {
  const paths = orders.map((x) => {
    return { params: { id: x.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const getStaticProps = async (context) => {
  const id = parseInt(context.params.id);
  let order = orders.filter((x) => x.id === id)[0].orders;
  return {
    props: { order },
  };
};
const Orders = ({ order }) => {
  const classes = useStyles();
  console.log("Order - ", order);
  
  let subTotal = 0;
  for (let key in order) {
    subTotal += order[key].price * order[key].cartquantity;
  }

  return (
    <Layout title="Order Details">
        <Typography variant="h1" align="center" component="h1">
          Order Details
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                  <Grid item md={9}>
                    <Grid container>
                      <TableContainer>
                        <Table aria-label="Orders">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Description</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                              <TableCell align="right">Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                  {item.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {item.description}
                                </TableCell>
                                <TableCell align="right">
                                  {item.cartquantity}
                                </TableCell>
                                <TableCell align="right">
                                  {item.price}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Typography variant="h6">Total: {subTotal}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
    </Layout>
  );
};
export default Orders;
