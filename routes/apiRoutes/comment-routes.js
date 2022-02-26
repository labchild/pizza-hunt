const router = require('express').Router();
const { 
    addComment, 
    removeComment,
    addReply,
    removeReply 
} = require('../../controllers/comment-controllers');

// create comments
router.route('/:pizzaId').post(addComment);

// delete comment & add comment reply (put)
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

// remove replies from comments (update comment)
// "Go to this pizza, then look at this particular comment, then delete this one reply."
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeComment);

module.exports = router;