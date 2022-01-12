const express = require("express");
const mongoose = require("mongoose");
const foodModel = require("./models/Food");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://umer:umer@cluster0.p0lbu.mongodb.net/food?retryWrites=true&w=majority"
);
app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const daysSinceIAte = req.body.daysSinceIAte;
  //   const food = new foodModel({ foodName: "Mangoe", daysSinceIAte: 4 });
  const food = new foodModel({ foodName, daysSinceIAte });
  try {
    await food.save();
    res.send("data is inserted!");
  } catch (error) {
    console.log(error);
    res.send("there is an error!");
  }
});
app.get("/read", (req, res) => {
  foodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
