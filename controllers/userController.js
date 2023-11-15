const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single user by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate({ path: 'thoughts' }) //* is this correct?

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndRemove({ _id: req.params.userId }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with id found' });
            }
            //* TODO ask Dom about this
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { new: true }
            );

            res.json( { message: 'Friend added.', data: user });
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // async deleteFriend(req, res) {
    //     try {
    //         const user  = await 
    //     }
    // }
};