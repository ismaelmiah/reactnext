import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}
export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  const addToCart = (products) => {
    localStorage.setItem("cart", JSON.stringify(products));
    setCart(products);
  };

  const updateCartQty = ({ id, qty }) => {
    let products = cart.map((product) => {
      if (product.id == id) product.cart_qty = qty;
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(products));
    setCart(products);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQty }}>
      {props.children}
    </CartContext.Provider>
  );
};
