const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtsId
router
    .route('/:thoughtsId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtsId/reactions
router.route('/:thoughtsId/reactions').post(addThoughtReaction);

// /api/:thoughtsId/reactions/reactionId
router.route('/:thoughtsId/reactions/:reactionId').delete(removeThoughtReaction);


module.exports = router;
