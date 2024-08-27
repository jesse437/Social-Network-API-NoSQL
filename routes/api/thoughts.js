const user = require("./thoughts");
const express = require("express");
const mongoose = require("mongooose");
const { thoughts } = require("models");
const thoughts = ('../config/controllers');


app.get('/api/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/api/thoughts', async (req, res) => {
    const { thoughtText, username, userId } = req.body;

    const newThought = new Thought({
        thoughtText,
        username,
        userId,
    });

    try {
        const savedThought = await newThought.save();

        
        const user = await User.findById(userId);
        user.thoughts.push(savedThought._id);
        await user.save();

        res.status(201).json(savedThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.put('/api/thoughts/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) return res.status(404).json({ message: 'Thought not found' });
        res.json(updatedThought);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


app.delete('/api/thoughts/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) return res.status(404).json({ message: 'Thought not found' });

        
        await User.updateMany(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } }
        );

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});










module.exports = app;
