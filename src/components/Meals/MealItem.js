import classes from "../../css/MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import cartContent from "../../store/cart-context";

export default function MealItem(props) {
    const price = `$${props.mealsData.price.toFixed(2)}`;
    const cartCtx = useContext(cartContent);

    function addToCartHandler(amount){
      cartCtx.addItem({
        id: props.mealsData.id,
        name: props.mealsData.name,
        amount: amount,
        price: props.mealsData.price
      });
    }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.mealsData.name}</h3>
        <p className={classes.description}>{props.mealsData.description}</p>
        <p className={classes.price}>{price}</p>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler}></MealItemForm>
      </div>
    </li>
  );
}
