const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Add this for CORS support
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.qpmfcmk.mongodb.net/todoListDB`);

const itemsSchema = new mongoose.Schema ({
    task: {
        type: String,
        required: [true, "Item Missing"]
    }
});

const Item = mongoose.model("Item", itemsSchema);

const taskA = new Item ({task : "Wake Up"});
const taskB = new Item ({task : "Morning Workout"});
const taskC = new Item ({task : "Eat a Hearty Breakfast"});

const defaultTasks = [taskA,taskB,taskC];

async function saveTasks() {
  try {
    await Item.insertMany(defaultTasks);
    console.log("Successfully saved items to todoListDB");
  } catch (err) {
    console.error(err);
  }
}

app.get("/api/tasks", async (req, res) => {
  try {
    const items = await Item.find({});
    if (items.length === 0) {
      saveTasks();
    } else {
      res.json(items);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const itemName = req.body.newItem;
    const newTask = new Item({ task: itemName });
    await newTask.save();
    res.sendStatus(201); // Created
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const checkedItemID = req.params.id;
    await Item.findByIdAndRemove(checkedItemID);
    res.sendStatus(200); // OK
    console.log("Successfully deleted checked item");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});