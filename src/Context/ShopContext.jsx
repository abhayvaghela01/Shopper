import React, { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  useEffect(() => {
    // console.log(cartItems);
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      const quantity = cartItems[item];

      // Only process items that have a positive quantity
      if (quantity > 0) {
        const itemId = Number(item); // Convert the item to a number
        const itemInfo = all_product.find((product) => product.id === itemId);

        // Ensure the item exists in all_product
        if (itemInfo) {
          totalAmount += itemInfo.new_price * quantity; // Calculate total price for this item
        } else {
          console.warn(`Item with id ${itemId} not found in all_product`);
        }
      }
    }

    return totalAmount;
  };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = all_product.find(
  //         (product) => product.id === Number(item)
  //       );
  //       totalAmount += itemInfo.new_price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // };

  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItem
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
