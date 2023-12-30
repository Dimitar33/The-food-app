import classes from "../../css/AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import { useState, useEffect } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  

  async function fetchMeals() {
    
    const request = await fetch("https://learning-react-ec08a-default-rtdb.firebaseio.com/meals.json");
    const data = await request.json()

    const mealsArray = [];

    for (const item in data) {

      mealsArray.push({
        id: item,
        name: data[item].name,
        price: data[item].price,
        description: data[item].description,
      });
    }

    setMeals(mealsArray)
  }

  useEffect(() => {
    fetchMeals();
  }, []);


  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((x) => (
            <MealItem key={x.id} mealsData={x}></MealItem>
          ))}
        </ul>
      </Card>
    </section>
  );
}
