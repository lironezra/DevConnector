const express = require('express');
const router = express.Router();
const PostController = require('../../controllers/post');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router
  .route('/')
  .post(
    validateBody(schemas.postSchema),
    passportJWT,
    PostController.createPost
  );

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.route('/').get(passportJWT, PostController.getAllPosts);

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.route('/:id').get(passportJWT, PostController.getPostById);

// @route   DELETE api/posts/:id
// @desc    Delete post by ID
// @access  Private
router.route('/:id').delete(passportJWT, PostController.deletePost);

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.route('/like/:id').put(passportJWT, PostController.likeAPost);

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.route('/unlike/:id').put(passportJWT, PostController.unlikeAPost);

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router
  .route('/comment/:id')
  .post(
    validateBody(schemas.commentsSchema),
    passportJWT,
    PostController.commentOnPost
  );

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router
  .route('/comment/:id/:comment_id')
  .delete(passportJWT, PostController.deleteComment);

module.exports = router;
