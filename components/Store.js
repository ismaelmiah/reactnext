import React, { createContext, useReducer } from "react";
import { getProducts } from "../utils/data";

const initialState = {
  products: getProducts,
  cart: null,
  order: null
};

export const Store = createContext(initialState);
// const order =
//   typeof window !== 'undefined' && window.localStorage.getItem('order_receipt')
//     ? JSON.parse(window.localStorage.getItem('order_receipt'))
//     : null;

function reducer(state, action) {
  console.log('Reducer - ', action.type)
  switch (action.type) {
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
