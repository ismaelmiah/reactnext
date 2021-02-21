import data from "../../utils/order.json";
import React from "react";
import { Layout } from "../../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Grid,
  Table,
  List,
  ListItem,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));



export async function getServerSideProps({params}){
  let orders
  await fetch(`http://localhost:3000/api/getOrder/?id=${params.id}`)
  .then(res=>res.json()).then(data=>{
    console.log("Data - ", data);
    orders = data
  }).catch(err=>{if(err)console.log(err)})
  return {
          props: {
            orders
          }
      }
  
}
const userProfile = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Orders = ({ orders }) => {
  const classes = useStyles();
  const userClasses = userProfile();
  const order = orders.orders;
  let subTotal = 0;
  for (let key in order) {
    subTotal += order[key].price * order[key].cartquantity;
  }
  return (
    <Layout title="Order Details">
      <Typography variant="h1" align="center" component="h1">
        Order Details
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item md={8}>
                  <Grid container>
                    <TableContainer>
                      <Table aria-label="Orders">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell component="th" scope="row">
                                {item.name}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.description}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <img
                                  src={`/images/${item.id}.jpg`}
                                  height="50"
                                  widht="50"
                                />
                              </TableCell>
                              <TableCell align="right">
                                {item.cartquantity}
                              </TableCell>
                              <TableCell align="right">{item.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <Grid item md={4} xs={12}>
                  <List>
                    <ListItem style={{ margin: "20px" }}>
                      <Card className={userClasses.root}>
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            Total: {subTotal}
                          </Typography>
                          <Typography style={{margin: "40px 0px 0px 0px"}} variant="h5" component="h2">
                            Name: {orders.user.Name}
                          </Typography>
                          <Typography variant="h5" component="h2">
                            Mobile: {orders.user.Mobile}
                          </Typography>
                          <Typography variant="h5" component="h2">
                            Address: {orders.user.Address}
                          </Typography>
                        </CardContent>
                      </Card>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};
export default Orders;
