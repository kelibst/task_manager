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
    res.status(400).send("error");
  }
});

app.post("/v1/tasks", (req, res) => {
  const task = Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/v1/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/v1/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User was not found!");
      }
      res.send(user);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

app.get("/v1/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/v1/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then((task) => {
      res.send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
