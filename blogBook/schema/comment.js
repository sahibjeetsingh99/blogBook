const mongoose = require('mongoose');

const comment_Schema = new mongoose.Schema({

  //enter the objectId of the author as in authorId: '' and the commenter's name will be picked by the system eventually corresponding to that authorid
  commenterName: {
    type: String,
    required: true,
  },

  //enter the comment you want to make at the blog post
  commentText: {
    type: String,
    required: true,
  },

  //it will generate automatically
  creationDate: {
    type: Date,
    default: Date.now,
  },

  //it is the object id of the specific posts the user commented at 
  blogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPosts',
    required: true,
  },
});

const Comment = mongoose.model('Comment', comment_Schema);

module.exports = Comment;
