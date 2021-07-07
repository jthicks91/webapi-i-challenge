// implement your API here

const express = require("express");

const db = require("./data/db.js");
// const people = require("./data/seeds/users.js");

const { hubs } = db;
// const { users } = people;

const server = express();

// middleware VERY IMPORTANT FOR SEEING WHATS ON BODY VIA POSTMAN

server.use(express.json());

// const sendUserError = (status, message, res) => {
//   res.status(status).json({ errorMessage: message });
// };

// Returns an array of all the user objects contained in the database.
server.get("/users", (req, res) => {
  hubs
    .find()
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

// Creates a user using the information sent inside the request body.
server.post("/users", (req, res) => {
  const newUser = req.body;

  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    return;
  }
  hubs
    .insert(newUser)
    .then(addedUser => {
      res.status(201).json(addedUser);
    })
    .catch(() => {
      res.status(500).json({
        err: "There was an error while saving the user to the database"
      });
    });
});

// Removes the user with the specified id and returns the deleted user.
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  hubs
    .remove(id)
    .then(removedUser => {
      if (!removedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(removedUser);
      }
    })
    .catch(() => {
      res.status(500).json({ err: "The user could not be removed" });
    });
});

// Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    return;
  }
  hubs
    .update(id, { name, bio })
    .then(updatedUser => {
      if (!updatedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ err: "The user information could not be modified." });
    });
});

//Returns the user object with the specified id.
server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  hubs
    .findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specificed ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
