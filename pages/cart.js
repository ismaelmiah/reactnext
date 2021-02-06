import React, { useEffect, useContext } from "react";

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
import { useStyles } from "../utils/styles";
import CartContext from "../components/cartContext";
import Router from "next/router";
import { Layout } from "../components/Layout";

const Cart = () => {
  const classes = useStyles();

  const { cart, setCart, IncreastQuantity, DecreaseQuantity } = useContext(
    CartContext
  );


  let subTotal = 0;
  console.log("Cart - ", cart);

  for (let key in cart) {
    subTotal += cart[key].price;
  }

  const quantityChangeHandler = (product, newQuantity) => {
    console.log(product.id, newQuantity);
    UpdateCart(product.id, newQuantity);
    console.log("Updated Cart ", cart);
  };

  return (
    <Layout>
      {cart.length == 0 ? (
        <Typography variant="h1" align="center" component="h1">
          Your Cart is Empty
        </Typography>
      ) : (
        <div>
          <Typography variant="h1" component="h1">
            Shopping Cart
          </Typography>
          <Slide direction="up" in={true}>
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
                        {cart.map((cartItem) => (
                          <TableRow key={cartItem.name}>
                            <TableCell component="th" scope="row">
                              {cartItem.name}
                            </TableCell>
                            <TableCell align="right">
                              <button
                                onClick={() => DecreaseQuantity(cartItem.id)}
                              >
                                -
                              </button>
                              <span>{cartItem.quantity}</span>
                              <button
                                onClick={() => IncreastQuantity(cartItem.id)}
                              >
                                +
                              </button>
                            </TableCell>
                            <TableCell align="right">
                              {cartItem.price}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                onClick={() => removeFromCartHandler(cartItem)}
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
                <Card className={classes.card}>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Typography variant="h6">
                          Subtotal: {subTotal}
                        </Typography>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      {cart.length > 0 && (
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => Router.push("/checkout")}
                        >
                          Proceed to checkout
                        </Button>
                      )}
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Slide>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
