const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/v1/users", async (req, res) => {
  const user = User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/v1/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/v1/users/:id", async (req, res) => {
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

router.patch("/v1/users/:id", async (req, res) => {
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
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    // //   new: true,
    // //   runValidators: true,
    // // });

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("User was not found!");
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/v1/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
