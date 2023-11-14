const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            validate: {
                validator: function (validate) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/.test(validate);
                },
                message: 'Please enter a valid email'
            },
            required: [true, "Email required"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
        ],
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
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})


// Initialize our User model
const User = model('user', userSchema);

module.exports = User;