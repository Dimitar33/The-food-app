import classes from "../../css/Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import cartContent from "../../store/cart-context";
import CartItem from "../Cart/CartItem";

export default function Cart(props) {
  const cartCtx = useContext(cartContent);

  function onRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function onAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((x) => (
        <CartItem
          id={x.id}
          cartData={x}
          onAdd={onAddHandler.bind(null, x)}
          onRemove={onRemoveHandler.bind(null, x.id)}
        ></CartItem>
      ))}
    </ul>
  );

  async function orderHandler() {

    props.hideCart();
    cartCtx.clearCart();
    

    const request = await fetch(
      "https://learning-react-ec08a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(cartCtx.items),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await request.json();
    alert('Thank you for your order');
    console.log(data);
  }

  return (
    <Modal hideCart={props.hideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.hideCart}>
          Close
        </button>
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      </div>
    </Modal>
  );
}
