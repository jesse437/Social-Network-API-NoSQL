const { User, Thought } = require('../models');


module.exports = {
    //---USERS---//
    //GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //POST to create new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //PUT to update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body},
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE to remove a user by id and any associated thoughts with it
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },


    //---FRIENDS---//
    //POST to add a new friend to a user's friend list
    async addUserFriend(req, res) {
        const { userId, friendId } = req.params;
    
        try {
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }
    
            await user.addFriend(friendId);
            res.json({ message: 'Friend successfully added!' });
    
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE to remove a friend from a user's friend list
    async deleteFriend(req, res) {
        const { userId, friendId } = req.params;
    
        try {
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }

            await user.deleteFriend(friendId);
            res.json({ message: 'Friend successfully deleted!' });
    
        } catch (err) {
            res.status(500).json(err);
        }
    },

};



