import Head from "next/head";
import React, { useContext, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import NextLink from "next/link";
import { ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { theme } from "../utils/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStyles } from "../utils/styles";
import { Badge } from "@material-ui/core";
import  CartContext from "./cartContext";

export const Layout = ({ children, title="Home" }) => {
  const classes = useStyles();
  const { cart } = useContext(CartContext);
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
                {`${title}`}
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
            <nav>
              <NextLink href="/orders">
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/orders"
                  className={classes.link}
                >
                  My Orders
                </Link>
              </NextLink>
            </nav>
          </Toolbar>
        </AppBar>

        <Container component="main" className={classes.main}>
          {children}
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};
