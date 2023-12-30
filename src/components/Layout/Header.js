import React, { Fragment } from "react";
import mealsImg from "../../assets/meals.jpg";
import clases from "../../css/Header.module.css";
import CartButton from "./CartButton";

export default function Header(props) {
  return (
    <Fragment>
      <header className={clases.header}>
        <h1>Food App</h1>
        <CartButton showCart={props.showCart}></CartButton>
      </header>
      <div className={clases['main-image']}>
        <img alt="A table full with delicious food!" src={mealsImg}></img>
      </div>
    </Fragment>
  );
}
