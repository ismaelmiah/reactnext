import React, { useContext } from "react";
import Link from "next/link";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Slide,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Store } from "../components/Store";
import Layout from "../components/Layout";

export default function Home(props) {
  const { state, AddToCart } = useContext(Store);
  const products = state.state.products;
  return (
    <Layout title="Home">
      <Grid container spacing={1}>
        {products.map((product) => (
          <Slide key={product.id} direction="up" in={true}>
            <Grid item md={3}>
              <Card>
                <Link href={`/products/${product.id}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      image={`/images/${product.id}.jpg`}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {product.name}
                      </Typography>
                      <Box>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="p"
                        >
                          $ {product.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          </Slide>
        ))}
      </Grid>
    </Layout>
  );
}
