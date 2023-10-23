const express = require('express');
const router = express.Router();
const BlogPost = require('../schema/blogPosts'); // Import the BlogPost model

// Create a new blog post
router.post('/author/:authorId', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    author = req.params.authorId
    const blogPost = new BlogPost({ title, content, author, tags });
    await blogPost.save();
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the blog post' });
  }
});
// Get all blog posts of a specific author
router.get('/author/:authorId', async (req, res) => {
    try {
      const authorId = req.params.authorId;
  
      // Find all blog posts with the specified author's ID
      const blogPosts = await BlogPost.find({ author: authorId });
  
      if (blogPosts.length === 0) {
        return res.status(404).json({ message: 'No blog posts found for the author' });
      }
  
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching blog posts' });
    }
  });

// Get posts based on tags
router.get('/author/:authorId/tags', async (req, res) => {
  const tags = req.query.tag; 
  const tagArray = tags.split(','); // Split the string into an array
  try {
    // Find posts that have at least one of the specified tags
    const filteredPosts = await BlogPost.find({ tags: { $in: tagArray } });
    res.json(filteredPosts);
  } catch (error) {
    console.error('Error fetching filtered posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the blog post' });
  }
});

// Update a blog post by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the blog post' });
  }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlogPost = await BlogPost.findByIdAndRemove(id);
    if (!deletedBlogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the blog post' });
  }
});





module.exports = router;
