const express = require('express');
const db = require('../models/dbModels');
const app = express();
const yelp = require('yelp-fusion');
const API_KEY = require('../../security/key')
const client = yelp.client(API_KEY.yelpKey);

const searchControllers = {};

const functionWithPromise = item => {
  return Promise.resolve(item)
}

const anAsyncFunction = async item => {
  return functionWithPromise(item)
}

//get request to Yelp API for business IDs
searchControllers.sendUserSearch = (req, res, next) => {
  let { location, categories } = req.body;
  location = location.toLowerCase();
  categories = categories.toLowerCase();
  client.search({
    term: 'restaurants',
    location: location,
    categories: categories,
    limit: 6,
  })
  .then((data) => {
    return JSON.parse(data.body);
  })
  .then((data)=>{
    const { businesses } = data;
    Promise.all(businesses.map(obj => anAsyncFunction(obj.id)))
    .then((results) => {
      res.locals.ids = results
      return next()
    }
  )
    .catch(err => {
      return next('Error: error in searchControllers.sendUserSearch')
    })
  })
}

// necessary to use Promise.all as a result of multiple async calls being passed
// Promise all resolves all async processes then sends the finished result down
searchControllers.sendID = (req, res, next) => {
   Promise.all(res.locals.ids.map(id => anAsyncFunction(client.business(id))))
    .then((data) => {
      const obj = {};
      for(let i = 0; i < data.length; i++){
        obj[i] = data[i].jsonBody
     }
      res.locals.details = obj;
      return next()
    })
    .catch((err)=>{
      return next(err);
    })
  };

module.exports = searchControllers