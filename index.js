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

// Removes the user with the specified id and returns the deleted user.
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  hubs
    .remove(id)
    .then(removedUser => {
      if (removedUser) {
        res.json(removedUser);
      } else {
        res.status(404).json({ err: "incorrect id" });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

// Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  hubs
    .update(id, changes)
    .then(updatedUser => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ err: "incorrect id" });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

//Returns the user object with the specified id.
server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  hubs
    .findById(id)
    .then(user => {
      res.json(user);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
