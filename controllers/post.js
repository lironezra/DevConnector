const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

const Profile = require('../models/Profile');
const Post = require('../models/Post');
const User = require('../models/User');

const { githubToken } = require('../config');

module.exports = {
  createPost: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select({
        'local.password': 0
      });
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.status(200).json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });

      res.status(200).json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ msg: 'Post no found' });
      }

      res.status(200).json(post);
    } catch (err) {
      console.error(err.message);

      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Post not found' });
      }

      res.status(500).send('Server Error');
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ msg: 'Post not found' });
      }

      // Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }

      await post.remove();

      res.status(200).json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);

      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Post not found' });
      }

      res.status(500).send('Server Error');
    }
  },
  likeAPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Check if post has already been liked
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: 'post already liked' });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.status(200).json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  unlikeAPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Check if post has already been liked
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ msg: 'post has not yet been liked' });
      }

      // Get the remove index
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();

      res.status(200).json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  commentOnPost: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select({
        'local.password': 0
      });
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.status(200).json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  deleteComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Pull out comment from post
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      // Make sure comments exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exists' });
      }

      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }

      const removeIndex = post.comments
        .map((comment) => comment.user.toString())
        .indexOf(req.user.id);

      post.comments.splice(removeIndex, 1);

      await post.save();

      res.status(200).json(post.comments);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
};
