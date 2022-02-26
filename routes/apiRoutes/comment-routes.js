const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controllers');

// create comments
router.route('/:pizzaId').post(addComment);

// delete comment
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;