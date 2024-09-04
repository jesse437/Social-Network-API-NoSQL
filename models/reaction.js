const { Schema, model } = require('mongoose');

//schema for what makes up a reaction
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    }
);



function dateFormat(timestamp) {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}



const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;