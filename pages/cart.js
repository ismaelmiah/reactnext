// import React, { useContext, useState, useEffect } from "react";
// import Layout from "../components/Layout";

// import {
//   Button,
//   Card,
//   CircularProgress,
//   Grid,
//   List,
//   ListItem,
//   MenuItem,
//   Select,
//   Slide,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@material-ui/core";
// import { useStyles } from "../utils/styles";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import Router from "next/router";

// function Cart(props) {
//   const classes = useStyles();
//   const { state, RemoveCart } = useContext(Store);

//   const [cart, setCart] = useState([]);
//   //const [subTotal, setsubTotal] = useState([]);
//   const subTotal = cart.reduce(function (prev, cur) {
//     return prev + cur.price;
//   }, 0);
//   const removeFromCartHandler = async (lineItem) => {
//     RemoveCart(lineItem);
//   };
//   const quantityChangeHandler = async (lineItem, quantity) => {
//     const commerce = getCommerce(props.commercePublicKey);
//     const cartData = await commerce.cart.update(lineItem.id, {
//       quantity,
//     });
//     dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
//   };

//   useEffect(() => {
//     setCart(
//       JSON.parse(localStorage.getItem("myCart"))?.length > state.state.cart
//         ? JSON.parse(localStorage.getItem("myCart"))
//         : state.state.cart
//     );
//   }, []);

//   const proccessToCheckout = () => {
//     Router.push("/checkout");
//   };
//   console.log("Shopping Cart - ", subTotal);
//   return (
//     <Layout title="Shopping Cart">
//       {cart.length === 0 ? (
//         <h1>
//           Cart is empty. <Link href="/">Go shopping</Link>
//         </h1>
//       ) : (
//         <React.Fragment>
//           <Typography variant="h1" component="h1">
//             Shopping Cart
//           </Typography>
//           <Slide direction="up" in={true}>
//             <Grid container spacing={1}>
//               <Grid item md={9}>
//                 <Grid container>
//                   <TableContainer>
//                     <Table aria-label="Orders">
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Name</TableCell>
//                           <TableCell align="right">Quantity</TableCell>
//                           <TableCell align="right">Price</TableCell>
//                           <TableCell align="right">Action</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {cart.map((cartItem) => (
//                           <TableRow key={cartItem.name}>
//                             <TableCell component="th" scope="row">
//                               {cartItem.name}
//                             </TableCell>
//                             <TableCell align="right">
//                               <Select
//                                 labelId="quanitity-label"
//                                 id="quanitity"
//                                 onChange={(e) =>
//                                   quantityChangeHandler(
//                                     cartItem,
//                                     e.target.value
//                                   )
//                                 }
//                                 value={cartItem.quantity}
//                               >
//                                 {[...Array(10).keys()].map((x) => (
//                                   <MenuItem key={x + 1} value={x + 1}>
//                                     {x + 1}
//                                   </MenuItem>
//                                 ))}
//                               </Select>
//                             </TableCell>
//                             <TableCell align="right">
//                               {cartItem.price}
//                             </TableCell>

//                             <TableCell align="right">
//                               <Button
//                                 onClick={() => removeFromCartHandler(cartItem)}
//                                 variant="contained"
//                                 color="secondary"
//                               >
//                                 x
//                               </Button>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </Grid>
//               </Grid>
//               <Grid item md={3} xs={12}>
//                 <Card className={classes.card}>
//                   <List>
//                     <ListItem>
//                       <Grid container>
//                         <Typography variant="h6">
//                           Subtotal: {subTotal}
//                         </Typography>
//                       </Grid>
//                     </ListItem>
//                     <ListItem>
//                       {cart.length > 0 && (
//                         <Button
//                           type="button"
//                           fullWidth
//                           variant="contained"
//                           color="primary"
//                           onClick={proccessToCheckout}
//                         >
//                           Proceed to checkout
//                         </Button>
//                       )}
//                     </ListItem>
//                   </List>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Slide>
//         </React.Fragment>
//       )}
//     </Layout>
//   );
// }
// export default dynamic(() => Promise.resolve(Cart), {
//   ssr: false,
// });
