// router.js
const express = require('express');
//const BlogController = require('./controllers/blogpost.controller');
const UserController = require('./controllers/user.controller');

module.exports = app => {
  // route groups
  const apiRoutes = express.Router();

  /*************** USER ***************************/
  const userRoutes = express.Router();
  apiRoutes.use('/users', userRoutes);
  userRoutes.post('/', UserController.create);
  userRoutes.post('/signin', UserController.singIn);


  /***************** BLOGPOST *******************/
  /*const blogPostRoutes = express.Router();
  apiRoutes.use('/blogPosts', blogPostRoutes);
  blogPostRoutes.post('/', BlogController.create);
  blogPostRoutes.get('/', BlogController.list);
  blogPostRoutes.get('/:url', BlogController.read);
  */

  // url for all API routes
  app.use('/api', apiRoutes);
};
