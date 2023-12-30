import classes from "../../css/MealItemForm.module.css";
import Input from "../UI/Input";
import React, {useState, useRef} from "react";


export default function MealItemForm(props) {
    const [isAmount, setAmount] = useState(true);

    const amountInputRef = useRef();

  function submitHandler(ev) {
    ev.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const anmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || anmountNumber < 1 || anmountNumber > 5){

        setAmount(false);
        return;
    }

    props.onAddToCart(anmountNumber);
  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Ammount"
        input={{
          id: "ammount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button>+ Add</button>
      {!isAmount && <p>Enter amount from 1 to 5</p>}
    </form>
  );
}
