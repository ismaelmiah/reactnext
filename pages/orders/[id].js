import orders from "../../utils/order.json";
import React from "react";
import { Layout } from "../../components/Layout";

export const getStaticPaths = async () => {
  const paths = orders.map((x) => {
    return { params: { id: x.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = parseInt(context.params.id);
  let order = orders.filter((x) => x.id === id)[0];
  return {
    props: { order },
  };
};
const Orders = ({ order }) => {
    console.log("Order - ", order)
  return (
    <Layout title="Orders">
      <h1>This is Product Page: {order.id}</h1>
    </Layout>
  );
};
export default Orders;
