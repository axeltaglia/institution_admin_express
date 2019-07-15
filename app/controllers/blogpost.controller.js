// blogpost.controller.js
"use strict"
const BlogPost = require('../models/blogpost.model');
// create a new Blog Post
exports.create = (req, res) => {
  const theURL = req.body.title.toLowerCase().split(' ').join('-');
  req.body['url'] = theURL;
  const NewBlogPost = new BlogPost(req.body);
  NewBlogPost.save((err, blogPost) => {
    if(err) {
      return res.status(422).json({
        msg: 'Server encountered an error publishing blog post.',
        error: err
      });
    }
    else {
      return res.status(200).json({
        msg: 'Successfully published blog post.',
        data: blogPost
      });
    }
  });
};

exports.list = (req, res) => {
    BlogPost.find( (err, blogPosts) => {
        if (err) return console.log(err);
        return res.status(200).json({
            msg: 'List of posts.',
            data: blogPosts
        });
    });
};

exports.read = ( req, res) => {
    BlogPost.findOne({url: req.params.url}, (err, blogPost) => {
        if (err) return console.log(err);
        return res.status(200).json({
            msg: 'Post',
            data: blogPost
        });
    });
};

