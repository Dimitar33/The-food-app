import CartContext from "./cart-context";
import React, { useReducer } from "react";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReduser = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems;
    let updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const idx = state.items.findIndex((x) => x.id === action.item.id);

    if (state.items.some((x) => x.id === action.item.id)) {
      updatedItems = [...state.items];
      updatedItems[idx].amount += action.item.amount;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "CLEAR") {
    return {
      items: [],
      totalAmount: 0,
    };
  } else if (action.type === "REMOVE") {
    const idx = state.items.findIndex((x) => x.id === action.id);
    let itemToRemove = state.items[idx];

    let updatedTotalAmount = state.totalAmount;
    let updatedItems = [...state.items];

    if (updatedItems[idx].amount === 1) {
      let itemsArr = state.items.filter((x) => !(x.id === itemToRemove.id));
      updatedTotalAmount = state.totalAmount - itemToRemove.price;
      updatedItems = [...itemsArr];
    } else {
      updatedTotalAmount = state.totalAmount - itemToRemove.price;
      updatedItems = [...state.items];
      updatedItems[idx].amount -= 1;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultState;
};

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReduser, defaultState);

  function addToCartHandler(item) {
    dispatchCartAction({ type: "ADD", item: item });
  }
  function removeFromCartHandler(id) {
    dispatchCartAction({ type: "REMOVE", id: id });
  }
  function clearFromCartHandler() {
    dispatchCartAction({ type: "CLEAR"});
  }

  const cartContent = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
    clearCart: clearFromCartHandler
  };

  return (
    <CartContext.Provider value={cartContent}>
      {props.children}
    </CartContext.Provider>
  );
}

//===============
