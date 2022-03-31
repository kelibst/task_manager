const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/v1/tasks", async (req, res) => {
  const task = Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/v1/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/v1/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    res.send(task);
  } catch {
    res.status(400).send(e);
  }
});

router.patch("/v1/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allUpdates = ["description", "completed"];
  const isValidOp = updates.every((update) => allUpdates.includes(update));

  if (!isValidOp) {
    return res
      .status(400)
      .send(
        "Invalid Operation: You are most likely trying to update a field we do not have in the db."
      );
  }

  try {
    if (!updates.length) {
      throw new Error("You did not pass a json body to your request");
    }
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

router.delete("/v1/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
