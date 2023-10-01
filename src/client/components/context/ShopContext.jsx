import React, { useState } from "react";

export const ShopContext = createContext(null)



const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < PRODUCTS.length; i++) {
        cart[i] = 0;
    }
    return cart;
}

export default function ShopContext(props) {
   const [cartItems, setCartItems] = useState();
   
   return (
       <div>
           <ShopContext.Provider>{props.children}</ShopContext.Provider>
        </div>
    )
}