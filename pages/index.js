import React from "react";
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
import data from "../utils/data.json";

import { Layout } from "../components/Layout";

export const getStaticProps = async (context) => {
  return {
    props: {
      products: data,
    },
  };
};

export default function Home({ products }) {

  return (
    <Layout>
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
