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
import React, { useContext, useState } from "react";
import CartContext from "../components/cartContext";
import router from 'next/router'

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

  const { cart, setCart } = useContext(CartContext);

  let subTotal = 0;
  for (let key in cart) {
    subTotal += cart[key].price * cart[key].quantity;
  }

  const [CheckoutForm, setCheckoutForm] = useState({
    Name: null,
    Mobile: null,
    Address: null,
    ZipCode: null,
  });

  const nameSet = (e) => {
    setCheckoutForm((prev) => {
      return { ...prev, Name: e };
    });
  };

  const mobileSet = (e) => {
    setCheckoutForm((prev) => {
      return { ...prev, Mobile: e };
    });
  };

  const addressSet = (e) => {
    setCheckoutForm((prev) => {
      return { ...prev, Address: e };
    });
  };

  const zipSet = (e) => {
    setCheckoutForm((prev) => {
      return { ...prev, ZipCode: e };
    });
  };

  const formSubmit = () => {
    fetch("http://localhost:3000/api/getProducts", {
      method: "POST",
      body: JSON.stringify(cart),
    }).then((res) => {
      if (res.status == 200) {
        fetch("http://localhost:3000/api/getOrder", {
          method: "POST",
          body: JSON.stringify({
            user: CheckoutForm,
            orders: cart,
          }),
        }).then((res, data) => {
          if (res.status == 200) {
            setCart([]);
            res.json().then((data) => router.push(`/orders/${data.id}`));
          }
        });
      }
    });
  };

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
                    <TextField
                      id="standard-error"
                      label="Name"
                      onChange={(e) => nameSet(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      id="standard-error"
                      label="Mobile"
                      onChange={(e) => mobileSet(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      id="standard-error"
                      label="Address"
                      onChange={(e) => addressSet(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      id="standard-error"
                      label="Zip Code"
                      onChange={(e) => zipSet(e.target.value)}
                    />
                  </div>
                  <div style={{ margin: "20px 0px 10px 0px" }}>
                    <Button
                      variant="contained"
                      onClick={() => formSubmit()}
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
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {cart.map((cartItem) => (
                              <TableRow key={cartItem.name}>
                                <TableCell component="th" scope="row">
                                  {cartItem.name}
                                </TableCell>
                                <TableCell align="right">
                                  {cartItem.cartquantity}
                                </TableCell>
                                <TableCell align="right">
                                  {cartItem.price}
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
