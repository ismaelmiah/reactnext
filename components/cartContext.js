import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();
export default CartContext;

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  const addToCart = (products) => {
    localStorage.setItem("cart", JSON.stringify(products));
    setCart(products);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {props.children}
    </CartContext.Provider>
  );
};
