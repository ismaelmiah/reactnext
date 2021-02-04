import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NextLink from "next/link";
import { ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { theme } from "../utils/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStyles } from "../utils/styles";
import { Badge, CircularProgress } from "@material-ui/core";
import { Store } from "../components/Store";

export default function Layout({ children, title = "E-Commerce" }) {
  const classes = useStyles();

  const { state, AddToCart } = useContext(Store);
  const cart = state.state.cart;
  console.log(cart);
  useEffect(() => {
    // //setCart(JSON.parse(localStorage.getItem("myCart")) || []);
  }, []);
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} - E-commerce`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <NextLink href="/">
              <Link
                variant="h6"
                color="inherit"
                noWrap
                href="/"
                className={classes.toolbarTitle}
              >
                Ecommerce
              </Link>
            </NextLink>

            <nav>
              <NextLink href="/cart">
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/cart"
                  className={classes.link}
                >
                  {cart.length > 0 ? (
                    <Badge badgeContent={cart.length} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  ) : (
                    <ShoppingCartIcon />
                  )}
                </Link>
              </NextLink>
            </nav>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container component="main" className={classes.main}>
          {children}
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="footer">
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"© Ecommerce"}
              2021
              {"."}
            </Typography>
          </Box>
        </Container>
        {/* End footer */}
      </ThemeProvider>
    </React.Fragment>
  );
}
