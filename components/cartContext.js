import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();
export default CartContext;

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    //console.log("Products - ", products);
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

  
  const UpdateCart = ({id,qty}) => {
    let products = cart.map(product=>{
        if(product.id==id) product.cart_qty = qty
        return product
    })
    localStorage.setItem("mycart",JSON.stringify(products))
    setCart(products)
}

  return (
    <CartContext.Provider value={{ cart, addToCart, UpdateCart }}>
      {props.children}
    </CartContext.Provider>
  );
};
