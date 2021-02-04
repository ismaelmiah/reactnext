import React, { createContext, useReducer } from "react";
import { getProducts } from "../utils/data";

const initialState = {
  products: getProducts,
  cart: [],
  cartTotal: 0,
};


export const Store = createContext(initialState);



export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  function addToCart(product) {
    dispatch({
      type: "ADD_CART",
      payload: product,
    });
    //localStorage.setItem('cart', JSON.stringify(state.cart));
  }

  const addProductToCart = (product) => {
    
    //console.log('\nupdatedItemIndex', updatedItemIndex, '\nCart: ', updatedCart)
    
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case "ADD_CART":
        {
            const updatedCart = [...state.cart];
            console.log([...updatedCart], action, "cart");
            const updatedItemIndex = updatedCart.findIndex(
              (item) => item.id === action.payload[0].id
            );
            if (updatedItemIndex < 0) {
              updatedCart.push({ ...action.payload, quantity: 1 });
            } else {
              const updatedItem = {
                ...updatedCart[updatedItemIndex],
              };
              updatedItem.quantity++;
              updatedCart[updatedItemIndex] = updatedItem;
              
            }
            return { ...state, cart: updatedCart };
        }
      case "REMOVE_CART":
        return {
          ...state,
          cart: state.cart.filter((c) => c.id !== action.payload),
        };
      default:
        return state;
    }
  }

  // RemoveCart = (productId) => {
  //   dispatch({
  //     type: "REMOVE_CART",
  //     payload: productId,
  //   });
  //   localStorage.getItem('cart', JSON.stringify(this.state.cart));
  // }

  const calculateTotal = (price) => {
    this.setState({
      carttotal: this.state.carttotal + price,
    });
    localStorage.setItem("total", JSON.stringify(this.state.carttotal));
  };

  return (
    <Store.Provider value={{ state: value, addToCart, calculateTotal }}>
      {children}
    </Store.Provider>
  );
}
