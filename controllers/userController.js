const { User, Thought } = require('../models');

module.exports = {

    // getter 
    getUser(req, res){
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // getter for single user
    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId })
            .then((user) => !user ? res.status(404).json({ message: 'Could not find a user with that ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    deleteUser(req, res){
        User.findOneAndDelete({ _id: req.params.userId })
            .then(user => {
                if(!user){
                    res.status(404).json({ message: 'Could not find a user with that ID' });
                    return;
                }

                User.updateMany(
                    { _id: { $in: user.friends } },
                    { $pull: { friends: req.params.userId } }
                )
                    .then(() => {
                        Thought.deleteMany({ username: user.username })
                            .then(() => {
                                res.json({ message: "User is deleted!" });
                            })
                            .catch(err => res.status(500).json(err));
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    },
    updateUser(req, res){
        User.fineOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then(user => !user ? res.status(404).json({ message: 'Could not find a user with that ID' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res){
        console.log("You are adding a new friend");
        console.log(req.body);;
        User.fineOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then(user => !user ? res.status(404).json({ message: 'Could not find a user with that ID' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    removeFriend(req, res){
        console.log(req.params.friendId);
        User.updateMany(
            { _id: { $in: user.friends } },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        ).then(user => !user ? res.status(404).json({ message: 'Could not find a user with that ID' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
        
    }
}









