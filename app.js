const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

MongoClient.connect(url, (error, client) => {
  if (error) {
    return console.log(error);
  }
  const db = client.db(dbName);

  // const updateName = db.collection("users").updateOne(
  //   {
  //     _id: new ObjectId("62441e28aecd6e41059a6ea2"),
  //   },
  //   {
  //     $set: {
  //       name: "Dogbevi Delali",
  //     },
  //   }
  // );

  // updateName
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  db.collection("users").findOne(
    { _id: ObjectId("62441e28aecd6e41059a6ea2") },
    (err, res) => {
      if (error) {
        return console.log("unable to fetch the data!");
      }
      console.log(res);
    }
  );
  // db.collection("tasks").insertMany(
  //   [
  //     {
  //       description: "Clean the house",
  //       completed: false,
  //     },
  //     {
  //       description: "Visit Mama",
  //       completed: true,
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return "unable to add document";
  //     }
  //     console.log(result);
  //   }
  // );
});
