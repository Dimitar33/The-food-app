import React, { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Layout/Cart";
import CartProvider from "./store/cartProvider";

function App() {

  const [cartState, setCartState] = useState(false);

  function showCart(){
     setCartState(true);
  }

  function hideCart(){
    setCartState(false);
  }

  return (
    <CartProvider>
    { cartState && <Cart hideCart={hideCart}></Cart>}
      <Header showCart={showCart}/>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
