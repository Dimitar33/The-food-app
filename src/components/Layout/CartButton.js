import React, { useContext, useEffect, useState } from "react";
import classes from "../../css/CartButton.module.css";
import CartIcon from "../../assets/cartIcon";
import cartContent from "../../store/cart-context";

export default function CartButton(props) {

    const cartCtx = useContext(cartContent);
    const [isBump, setBump] = useState(false);

    const btnClasses = `${classes.button} ${isBump ? classes.bump : ''}`

    useEffect(() => {

      if(cartCtx.items.length === 0){
        return;
      }
      setBump(true);

      const timer = setTimeout(() => {
        setBump(false);
      }, 300);

      return () => { clearTimeout(timer)};

    }, [cartCtx.items])

    let cartItemsNumber = cartCtx.items.reduce((curNumber, item) => 
    {return curNumber + item.amount;}, 0);
    
  return (
    <button className={btnClasses} onClick={props.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Yor cart </span>
      <span className={classes.badge}>{cartItemsNumber}</span>
    </button>
  );
}
