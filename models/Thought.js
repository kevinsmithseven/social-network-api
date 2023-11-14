const { Schema, model } = require('mongoose');

//Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return date.toLocaleDateString();
            }
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Create a virtual property 'friendCount' that retrieves the amount of friends a user has
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;