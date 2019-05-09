// implement your API here

const express = require("express");

const db = require("./data/db.js");
// const people = require("./data/seeds/users.js");

const { hubs } = db;
// const { users } = people;

const server = express();

// middleware VERY IMPORTANT FOR SEEING WHATS ON BODY VIA POSTMAN

server.use(express.json());

// Returns an array of all the user objects contained in the database.
server.get("/users", (req, res) => {
  hubs
    .find()
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

// Creates a user using the information sent inside the request body.
server.post("/users", (req, res) => {
  const newUser = req.body;
  hubs
    .insert(newUser)
    .then(addedUser => {
      res.status(201).json(addedUser);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
