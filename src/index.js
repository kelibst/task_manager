const express = require("express");
require("./db/app");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/v1/users", async (req, res) => {
  const user = User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/v1/tasks", async (req, res) => {
  const task = Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/v1/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/v1/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User was not found!");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/v1/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/v1/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    res.send(task);
  } catch {
    res.status(400).send(e);
  }
});

app.patch("/v1/users/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allUpdates = ["name", "email", "password", "age"];
  const isValidOp = updates.every((update) => allUpdates.includes(update));

  if (!isValidOp) {
    return res
      .status(400)
      .send(
        "Invalid Operation: You are most likely trying to update a field we do not have in the db."
      );
  }
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("User was not found!");
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch("/v1/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allUpdates = ["description", "completed"];
  const isValidOp = updates.every((update) => allUpdates.includes(update));

  console.log(updates);

  if (!isValidOp) {
    return res
      .status(400)
      .send(
        "Invalid Operation: You are most likely trying to update a field we do not have in the db."
      );
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send("Task was not found!");
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
