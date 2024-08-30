const { test } = require('media-typer');
const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing Users
    await User.deleteMany({});

    // Drop existing Thoughts
    await Thought.deleteMany({});
    const users = [{ username: "test1", email: "test1@test.com", thoughts: [], friends: [] }, { username: "test2", email: "test2@test.com", thoughts: [], friends: [] }, { username: "test3", email: "test3@test.com" }];
    const thoughts = [{ username: "testing1", thoughtText: "still just testing one" }, { username: "testing2", thoughtText: "still just testing two" }, { username: "testing3", thoughtText: "still just testing three" }]

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    // Add thoughts to collection
    await Thought.collection.insertMany(thoughts);


    // show seeded info
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});