import { Layout } from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import CartContext from "../components/cartContext";

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

const Checkout = () => {
  const classes = useStyles();

  const { cart, removeCart, IncreastQuantity, DecreaseQuantity } = useContext(
    CartContext
  );

  let subTotal = 0;
  for (let key in cart) {
    subTotal += cart[key].price * cart[key].quantity;
  }

  return (
    <Layout title="Checkout">
      {cart.length == 0 ? (
        <Typography variant="h1" align="center" component="h1">
          Cart is Empty
        </Typography>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <form className={classes.form} noValidate autoComplete="off">
                  <div>
                    <TextField id="standard-error" label="Name" />
                  </div>
                  <div>
                    <TextField id="standard-error" label="Mobile" />
                  </div>
                  <div>
                    <TextField id="standard-error" label="Address" />
                  </div>
                  <div>
                    <TextField id="standard-error" label="Zip Code" />
                  </div>
                  <div style={{ margin: "20px 0px 10px 0px" }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        alert("Confrim");
                      }}
                      color="primary"
                    >
                      Confirm Order
                    </Button>
                  </div>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                  <Grid item md={9}>
                    <Grid container>
                      <TableContainer>
                        <Table aria-label="Orders">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                              <TableCell align="right">Price</TableCell>
                              <TableCell align="right">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {cart.map((cartItem, index) => (
                              <TableRow key={cartItem.name}>
                                <TableCell component="th" scope="row">
                                  {cartItem.name}
                                </TableCell>
                                <TableCell align="right">
                                  {cartItem.quantity}
                                </TableCell>
                                <TableCell align="right">
                                  {cartItem.price}
                                </TableCell>
                                <TableCell align="right">
                                  <Button
                                    onClick={() => removeCart(index)}
                                    variant="contained"
                                    color="secondary"
                                  >
                                    x
                                  </Button>
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
      )}
    </Layout>
  );
};

export default Checkout;
