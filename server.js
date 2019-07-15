// server.js
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./app/config');
const jwt=require('jsonwebtoken');
const key=require("./app/key");
const User=require('./app/models/user.model');
const router = require('./app/router');
const anonymousUrls = require('./app/anonymousUrls');
const app = express();

app.use(bodyParser.json());

function getAuthToken(req) {
  try {
    return req.headers.authorization.split(" ")[1];
  } catch (e) {
    return null;
  }
}

app.use(function(req,res,next){
  let token = getAuthToken(req);
  if(token) {
    jwt.verify(token, key.tokenKey, (err, payload) => {
      if (payload) {
        User.findById(payload.userId).then(
            (doc)=>{
              req.user=doc;
              next()
            }
        )
      } else {
        res.status(500).json({error:'login is required'});
      }
    })
  } else {
    if (anonymousUrls.includes(req.url)) {
      next();
    } else {
      res.status(500).json({error: 'login is required'});
    }
  }
});

if(process.env.NODE_ENV === "test") {
  app.set('port', config.test_port);
  app.listen(app.get('port'), err => {
    if(err) console.error(err);
    console.log(`Server listening on port ${app.get('port')}...`);
    const db = mongoose.connect(config.test_db);
  });
} else {
  app.set('port', config.port);
  app.listen(app.get('port'), err => {
    if(err) console.error(err);
    console.log(`Server listening on port ${app.get('port')}...`);
    const db = mongoose.connect(config.db);
    mongoose.connection.on('connected', () => {
      console.log(`Mongoose connected to ${config.db}`);
    });
  });
}

router(app);

// needed for testing porpoises only
module.exports = app;
