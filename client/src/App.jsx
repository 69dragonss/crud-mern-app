import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [foodName, setFoodName] = useState("");
  const [daysSinceIAte, setDaysSinceIAte] = useState(0);
  const [foodList, setFoodList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, [foodList]);
  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName,
      daysSinceIAte,
    });
  };
  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />
      <br />
      <label>Days Since You Ate:</label>
      <input
        type="number"
        onChange={(event) => {
          setDaysSinceIAte(event.target.valueAsNumber);
        }}
      />
      <button onClick={addToList}>Add to List</button>
      <div>
        {foodList.map((item) => (
          <div key={item._id} className="flex">
            <h1>{item.foodName}</h1>
            <h1>:{item.daysSinceIAte}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
