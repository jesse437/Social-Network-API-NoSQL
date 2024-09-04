const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: [true, 'This username is not available to use'],
            required: [true, 'A username is required'],
            trim: true,
        },
        email: {
            type: String,
            unique: [true, 'There is already an account with this email'],
            required: [true, 'An email address is required'],
            //must match a valid email address
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
      //indicates that we want virtuals to be included with our response
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
  


//instance method to add a friend
userSchema.methods.addFriend = async function (friendId) {
    //c if the user is already a friend
    if (!this.friends.includes(friendId)) {
        this.friends.push(friendId);
        await this.save();

        return this;
    }
};



//instance method to remove a friend
userSchema.methods.deleteFriend = async function (friendId) {
    if (this.friends.includes(friendId)) {
        this.friends = this.friends.filter(id => !id.equals(friendId));

        await this.save();
    }
    return this;
};



//virtual that retrieves the length of the user's `friends` array
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});



const User = model('user', userSchema);

module.exports = User;