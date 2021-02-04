import React from 'react';
import { getProducts } from '../utils/data';
import Link from 'next/link';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Slide,
  CardMedia,
  Typography,
} from '@material-ui/core';

export default function Home() {

  return (
     <Grid container spacing={1}>
        {getProducts.map((product) => (
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
  );
}