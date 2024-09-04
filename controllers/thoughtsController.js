const { Thought, User } = require('../models');


module.exports = {
    //---THOUGHTS---//
    //GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET a single thought
    async getSingleThought(req, res) {
        try {
            console.log('req.params.thoughtId', req.params.thoughtId); //degugging
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            }
            
            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //POST to create a new thought
    async createThought(req, res) {
        try {
            const { username, thoughtText } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const thought = await Thought.create({ thoughtText, username });
            user.thoughts.push(thought._id);
            await user.save();

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //PUT to update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body},
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            }

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE to remove a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            }

            res.json({ message: 'Thought successfully deleted!' });
            
        } catch (err) {
            res.status(500).json(err);
        }
    },


    //---REACTIONS---//
    //POST to create a reaction
    async addUserReaction(req, res) {
        try {
            const { thoughtId } = req.params;
            const reactionData = req.body;
            
            const thought = await Thought.findById(thoughtId);
    
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            }
    
            await thought.addUserReaction(reactionData);
            res.json({ message: 'Reaction successfully added!'} );
    
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE to remove a reaction
    async deleteUserReaction(req, res) {
        const { thoughtId, reactionId } = req.params;

        try {
            const thought = await Thought.findById(thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            }

            await thought.deleteUserReaction(reactionId);
            res.json({ message: 'Reaction successfully removed!' });

        } catch (err) {
            res.status(500).json(err);
        }
    }
};

