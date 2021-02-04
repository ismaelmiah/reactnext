import React,  { useContext, useState } from 'react';
import { getProducts } from "../../utils/data";
import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  TextField,
  Slide,
  Typography,
} from "@material-ui/core";

import { useStyles } from "../../utils/styles";
import { Store } from '../../components/Store';

export const getStaticPaths = async () => {
  
  const paths = getProducts.map((x) => {
    return { params: { id: x.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = parseInt(context.params.id);
  const product = getProducts.filter((x) => x.id === id);
  return {
    props: { product },
  };
};

export default function Details(props) {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(1);
  const { product } = props;
  
  const { state, dispatch } = useContext(Store);
  //const { cart } = state;
  console.log('Details - ', state)
  
  const addToCartHandler = async () => {
    const commerce = getCommerce(props.commercePublicKey);
    const lineItem = cart.data.line_items.find(
      (x) => x.product_id === product.id
    );
    if (lineItem) {
      const cartData = await commerce.cart.update(lineItem.id, {
        quantity: quantity,
      });
      dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
      Router.push('/cart');
    } else {
      const cartData = await commerce.cart.add(product.id, quantity);
      dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
      Router.push('/cart');
    }
  };

  return (
    <Slide key={product[0].name} direction="up" in={true}>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <img
            alt={product[0].name}
            src={`/images/${product[0].id}.jpg`}
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
                {product[0].name}
              </Typography>
            </ListItem>
            <ListItem>
              <Box
                dangerouslySetInnerHTML={{ __html: product[0].description }}
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
                    {product[0].price}
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid alignItems="center" container>
                  <Grid item xs={6}>
                    Status
                  </Grid>
                  <Grid item xs={6}>
                    {product[0].quantity > 0 ? "In Stock" : "Unavailable"}
                  </Grid>
                </Grid>
              </ListItem>
              {product[0].quantity > 0 && (
                <>
                  <ListItem>
                    <Grid container justify="flex-end">
                      <Grid item xs={6}>
                        Quantity
                      </Grid>
                      <Grid item xs={6}>
                        <form noValidate autoComplete="off">
                          <TextField
                            id="standard-basic"
                            fullWidth
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          />
                        </form>
                      </Grid>
                    </Grid>
                  </ListItem>
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
                </>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Slide>
  );
}
