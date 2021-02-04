import React, { createContext, useReducer } from "react";
import { getProducts } from "../utils/data";

const initialState = {
  products: getProducts,
  cart: null,
  order: null,
};

export const Store = createContext(initialState);
// const order =
//   typeof window !== 'undefined' && window.localStorage.getItem('order_receipt')
//     ? JSON.parse(window.localStorage.getItem('order_receipt'))
//     : null;

function reducer(state, action) {
  console.log("Reducer - ", action.type);
  switch (action.type) {
    case "REMOVE_CART":
      return {
        ...state,
        employees: state.cart.filter((c) => c.id !== action.payload),
      };
    case "ADD_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "EDIT_CART":
      const updatedCart = action.payload;

      const updatedCarts = state.cart.map((c) => {
        if (c.id === updatedCart.id) {
          return updatedCart;
        }
        return cart;
      });

      return {
        ...state,
        cart: updatedCarts,
      };
    default:
      return state;
  }
}

export function StoreProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  function AddToCart(cart) {
    dispatch({
      type: "ADD_CART",
      payload: cart,
    });
  }

  function UpdateCart(cart) {
    dispatch({
      type: "EDIT_CART",
      payload: cart,
    });
  }

  function RemoveCart(id) {
    dispatch({
      type: "REMOVE_CART",
      payload: id,
    });
  }

  return (
    <Store.Provider
      value={{ products: state.products, AddToCart, UpdateCart, RemoveCart }}
    >
      {children}
    </Store.Provider>
  );
}
