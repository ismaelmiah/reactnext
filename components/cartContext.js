import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}
export const CartProvider = ( props ) => {
  const [cart, setCart] = useState([]);


  return (
    <CartContext.Provider value={{cart}}>
      {props.children}
    </CartContext.Provider>
  );
}
