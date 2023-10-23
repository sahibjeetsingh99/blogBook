const mongoose = require('mongoose');

const blog_Post_Schema = new mongoose.Schema({

  //enter the title of blogpost
  title: {
    type: String,
    required: true,
  },

  //enter the content of the blogpost
  content: {
    type: String,
    required: true,
  },

  //specify the object of the user which is making the blog post
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  //it will get generated automatically
  creationDate: {
    type: Date,
    default: Date.now,
  },

  //specify any tags you wanna dd to your blog post
  tags: [String],
});

const BlogPost = mongoose.model('BlogPost', blog_Post_Schema);

module.exports = BlogPost;
