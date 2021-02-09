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
      updatedCart.push({ ...product, cartquantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex],
      };
      if (updatedItem.quantity >= updatedItem.cartquantity + 1) {
        updatedItem.cartquantity++;
      } else {
        alert("Product Stock Out");
      }
      updatedCart[updatedItemIndex] = updatedItem;
    }

    localStorage.setItem("mycart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeCart = (id) => {
    const updatedCart = [...cart.filter((item, index) => index !== id)];
    localStorage.setItem("mycart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const IncreastQuantity = (id) => {
    const updatedCart = [...cart];

    const updatedItem = {
      ...updatedCart[id],
    };
    if (updatedItem.quantity >= updatedItem.cartquantity + 1) {
      updatedItem.cartquantity++;
    } else {
      alert("Product Stock Out");
    }
    console.log("UpdatedITem ", updatedItem);
    updatedCart[id] = updatedItem;
    localStorage.setItem("mycart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const DecreaseQuantity = (id) => {
    const updatedCart = [...cart];

    const updatedItem = {
      ...updatedCart[id],
    };
    updatedItem.cartquantity === 1
      ? (updatedItem.cartquantity = 1)
      : (updatedItem.cartquantity -= 1);
    updatedCart[id] = updatedItem;

    localStorage.setItem("mycart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("mycart"))) {
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
