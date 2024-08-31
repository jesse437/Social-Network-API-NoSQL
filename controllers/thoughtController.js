// getThought, getSingleThought, createThought, deleteThought, createReaction, deleteReaction

const { Thought, Reaction } = require('../models');



module.exports = { 

    // getter 
    getThought(req, res) {
        Thought.find()
                .then((thoughts) => req.json(thoughts))
                .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.userId })
                .then((thought) => !thought ? res.status(404).json({ message: 'Thought not found with that ID'}) : res.json(user))
                .catch((err) => res.status(500).json(err));
    },
// creating thought
    
    createThought(req, res) {
        Thought.create(req.body)
                .then((thought) => res.json(thought))
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json(err);
                });
    },
    //update thought through thoughtId in params and set to req.body
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Could not find a thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.userId })
                .then(user => {
                    if(!thought) {
                        res.status(404).json({ message: 'Thought not found with that ID'});
                        return;
                    }

                    Thought.updateMany(
                        { _id: { $in: thought.reaction } },
                        { $pull: { reaction: req.params.userId } }
                    )
                        .then(() => {
                            User.deleteMany({ username: user.username })
                                .then(() => {
                                    res.json({ message: "Thought is deleted"})
                                })
                                .catch(err => res.status(500).json(err));
                        })

                        .catch(err => res.status(500).json(err));


                })

                .catch(err => res.status(500).json(err));
    },
    


    
    createReaction(req, res) {
        Reaction.create(req.body)
                .then((reaction) => res.json(reaction))
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json(err);
                });
    },


    // delete route for reaction
    deleteReaction(req, res) {
        Reaction.findOneAndDelete({ _id: req.params.reactionId })
                .then(reaction => {
                    if( !reaction) {
                        res.status(404).json({ message: 'Could not find readtion with ID' });
                        return;
                    }

                    Reaction.updateMany(
                        { _id: { $in: thought.reaction } },
                        { $pull: { reaction: req.params.userId } }
                    )
                        .then(() => {
                            User.deleteMany({ username: user.username })
                                .then(() => {
                                    res.json({ message: "Thought is deleted"})
                                })
                                .catch(err => res.status(500).json(err));
                        })

                        .catch(err => res.status(500).json(err));

                    
                })


                .catch(err => res.status(500).json(err));
                
    }
} 