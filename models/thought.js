const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Your input cannot be empty. Please type something.'],
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp),
        },
        username: {
            type: Schema.Types.String,
            required: true,
            ref: 'User',
        },
        reactions: [Reaction.schema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);



//function that formats the timestamp
function dateFormat(timestamp) {
    const date = new Date(timestamp);

    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};



//instance method to add reaction
thoughtSchema.methods.addUserReaction = async function (reactionData) {
    this.reactions.push(reactionData);
    await this.save();

    return this;
};



//instance method to delete reaction
thoughtSchema.methods.deleteUserReaction = async function (reactionId) {
    this.reactions = this.reactions.filter(reaction => reaction._id.toString() !== reactionId);
    await this.save();
    return this;
};



//virtual that retrieves the length of the thought's `reactions` array field on query
thoughtSchema
  .virtual('reactionCount').get(function () {
    return this.reactions.length;
  });



const Thought = model('thought', thoughtSchema);

module.exports = Thought;