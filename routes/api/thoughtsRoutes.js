const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addUserReaction,
    deleteUserReaction
} = require('../../controllers/thoughtsController');


// api/thoughts
router.route('/').get(getThoughts).post(createThought);


// /api/thoughts/:thoughtsId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addUserReaction);


// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteUserReaction);


module.exports = router;