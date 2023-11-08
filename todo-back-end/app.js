const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.qpmfcmk.mongodb.net/todoListDB`);

const userSchema = new mongoose.Schema ({
  username: String,
  password: String
});

const User = new mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  try {
    const newUser = new User({ 
      username: req.body.username,
      password: req.body.password
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    
    const foundUser = await User.findOne({username: username})

    if (foundUser) {
      if (foundUser.password === password) {
        res.json(foundUser);
      } else {
        console.error("Password Incorrect!"); // Use console.error to log errors
        res.status(400).send("Password Incorrect!"); // Return a 400 Bad Request status
      }
    } else {
      console.error("Username does not exist!"); // Use console.error to log errors
      res.status(404).send("Username does not exist!"); // Return a 404 Not Found status
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
}});

const itemsSchema = new mongoose.Schema ({
    task: String,
    username: String
});

const Item = mongoose.model("Item", itemsSchema);

const Complete = mongoose.model("Complete", itemsSchema);

app.get("/api/tasks", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/tasks/:username", async (req, res) => {
  try {
    const user = req.params.username; 
    const items = await Item.find({ username: user});

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/tasks/:username", async (req, res) => {
  try {
    const itemName = req.body.newItem;
    const user = req.params.username; 
    const newTask = new Item({ task: itemName, username: user });
    await newTask.save();
    res.sendStatus(201); // Created
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedText = req.body.updatedText;
    await Item.findByIdAndUpdate(taskId, { task: updatedText });
    res.sendStatus(200); // OK
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const checkedItemID = req.params.id;
    const completeTaskContent = await Item.findById(checkedItemID);
    const completeTask = new Complete({ task: completeTaskContent.task, username: completeTaskContent.username});
    await completeTask.save();
    await Item.findByIdAndRemove(checkedItemID);
    res.sendStatus(200); // OK
    console.log("Successfully moved the task to completed tasks");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/completed-tasks/:username", async (req, res) => {
  try {
    const user = req.params.username;
    const completedTasks = await Complete.find({username: user});
    if (completedTasks.length === 0) {
      console.log('Tasks yet to be completed')
    } else {
      res.json(completedTasks);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/completed-tasks/:id", async (req, res) => {
  try {
    const checkedItemID = req.params.id;
    await Complete.findByIdAndRemove(checkedItemID);
    res.sendStatus(200); // OK
    console.log("Cleared Completed Task");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/completed-tasks/:username/all", async (req, res) => {
  try {
    const user = req.params.username;
    await Complete.deleteMany({username: user}); // Delete all completed tasks
    res.sendStatus(200); // OK
    console.log("Cleared all completed tasks");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});