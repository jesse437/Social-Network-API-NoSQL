const user = require("./user");
const express = require("express");
const mongoose = require("mongooose");
const { username, email } = require("models");
const users = require('../config/controllers');

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ username: "", email: "" }],
    });
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const usersData = await Users.findByPk(req.params.id, {
      include: [{ usernam: "", email: "" }],
    });

    if (!usersData) {
      res.status(404).json({ message: " No username found with that id!" });
      return;
    }

    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/api/users", async (req, res) => {
  const { username, email } = req.body;

  const newUser = new User({
    username,
    email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: "err.message" });
  }
});

router.put("/api/users/:id", (req, res) => {
  try {
    const updatedUser = User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
