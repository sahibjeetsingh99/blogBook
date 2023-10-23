const express = require('express');
const router = express.Router();
const Comment = require('../schema/comment');
const User = require('../schema/user'); // Import the Comment model

// Create a new comment for a specific blog post
router.post('/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const { commentText, authorId } = req.body;

    // Verify the user and fetch user information
    const user = await User.findById(authorId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const comment = new Comment({ blogPost: postId, commenterName: user.username, commentText });
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating the comment' });
  }
});


// Get all comments for a specific blog post
router.get('/posts/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Find all comments associated with the specified blog post
      const comments = await Comment.find({ blogPost: postId });
  
      if (comments.length === 0) {
        return res.status(404).json({ message: 'No comments found for the blog post' });
      }
  
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching comments' });
    }
  });

  // Update a comment by ID
router.put('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { commentText } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { commentText },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
});

// Delete a comment by ID
router.delete('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
  
    try {
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }  
      await comment.remove();
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting the comment' });
    }
  });

module.exports = router;
