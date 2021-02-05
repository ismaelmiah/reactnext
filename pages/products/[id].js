import data from "../../utils/data.json";
import React, { useContext } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Slide,
  Typography,
} from "@material-ui/core";

import { useStyles } from "../../utils/styles";
import CartContext, { useCart } from "./../../components/cartContext";


export const getStaticPaths = async () => {
  const paths = data.map((x) => {
    return { params: { id: x.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = parseInt(context.params.id);
  let product = data.filter((x) => x.id === id)[0];
  return {
    props: { product },
  };
};

export default function ProductDetails({ product }) {
  const classes = useStyles();

  const { cart, addToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addToCart([...cart, product]);
  };
  return (
    <Slide key={product.name} direction="up" in={true}>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <img
            alt={product.name}
            src={`/images/${product.id}.jpg`}
            className={classes.largeImage}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography
                gutterBottom
                variant="h6"
                color="textPrimary"
                component="h1"
              >
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Box
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    Price
                  </Grid>
                  <Grid item xs={6}>
                    {product.price}
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid alignItems="center" container>
                  <Grid item xs={6}>
                    Status
                  </Grid>
                  <Grid item xs={6}>
                    {product.quantity > 0 ? "In Stock" : "Unavailable"}
                  </Grid>
                </Grid>
              </ListItem>
              {product.quantity === 0 ? (
                <ListItem>
                  <Button
                    type="button"
                    disabled
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListItem>
              ) : (
                <ListItem>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Slide>
  );
}
