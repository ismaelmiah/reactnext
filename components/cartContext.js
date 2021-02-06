import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();
export default CartContext;

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );
    if (updatedItemIndex < 0) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex],
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }

    localStorage.setItem("mycart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeCart = (id) => {
    const updatedCart = [...cart.filter((item, index) => index !== id)];

    // updatedCart.forEach((item, index) => {
    //   if (item.id === id) {
    //     cart.splice(index, 1);
    //   }
    // });

    localStorage.setItem("mycart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const IncreastQuantity = (id) => {
    const updatedCart = [...cart];

    const updatedItem = {
      ...updatedCart[id],
    };
    updatedItem.quantity++;
    updatedCart[id] = updatedItem;
    localStorage.setItem("mycart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const DecreaseQuantity = (id) => {
    const updatedCart = [...cart];

    const updatedItem = {
      ...updatedCart[id],
    };
    updatedItem.quantity === 1
      ? (updatedItem.quantity = 1)
      : (updatedItem.quantity -= 1);
    updatedCart[id] = updatedItem;

    localStorage.setItem("mycart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("mycart"))){
      setCart(JSON.parse(localStorage.getItem("mycart")));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeCart,
        IncreastQuantity,
        DecreaseQuantity,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
