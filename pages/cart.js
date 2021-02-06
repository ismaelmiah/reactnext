import React, { useContext } from "react";
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
import CartContext from "./context/cartContext";
import Router from "next/router";
import { Layout } from "../components/Layout";

const Cart = () => {
  const classes = useStyles();
  const { cart, removeCart, IncreastQuantity, DecreaseQuantity } = useContext(
    CartContext
  );

  let subTotal = 0;
  for (let key in cart) {
    subTotal += cart[key].price * cart[key].quantity;
  }

  return (
    <Layout title="Cart">
      {cart.length == 0 ? (
        <Typography variant="h1" align="center" component="h1">
          Cart is Empty
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
                          <TableCell></TableCell>
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
                            <TableCell component="th" scope="row">
                              <img 
                                src={`/images/${cartItem.id}.jpg`}
                                height="50"
                                widht="50"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                onClick={() => DecreaseQuantity(index)}
                                variant="contained"
                                size="small"
                                color="secondary"
                              >
                                -
                              </Button>
                              <span style={{ margin: "0px 10px" }}>
                                {cartItem.cartquantity}
                              </span>
                              <Button
                                onClick={() => IncreastQuantity(index)}
                                variant="contained"
                                size="small"
                                color="primary"
                              >
                                +
                              </Button>
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
                <Card className={classes.card}>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Typography variant="h6">Total: {subTotal}</Typography>
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
