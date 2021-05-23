const express = require('express');
const starWarsController = require('../../../Week-4/unit-10-databases-new/server/controllers/starWarsController');
const starWarsModels = require('../../../Week-4/unit-10-databases-new/server/models/starWarsModels');
const db = require('./models/dbModels');
const key = 'FcwzVNzsVl_uQ2QdwZ5bkNZZp2d5zqBOB42D2SAzmtDgCLK0XxeClOD9F4aFyZcn58z0EjAKr8oRCKVje3z2hJwUHKbwUpOAYYoN_wAVYhinn0a0PN0YCX4txlCpYHYx'
const yelpSearchAPI = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=${category}&term=restaurants&radius=2000&limit=5`;
const yelpDetailsAPI = 'https://api.yelp.com/v3/businesses/';

const searchControllers = {};

const { category, location, email, id } = req.body;


//get request for the search button; sends the fetch request based on parameters
//uses the .thenable to get the array of IDs then fetches those businesses
searchControllers.userSearch = (req, res, next) => {
    fetch(yelpSearchAPI, {
        params: {
            location: 'Lake Forest',
            category: 'Sushi',
            limit: 10,
            headers: {
                Authorization: `Bearer ${key}`
            },
        },
    })
    .then(({data}) => {
        console.log(data, 'data')
        const { businesses } = data
        const results = data[id].map(x => fetch(yelpDetailsAPI`${x}`))
        console.log(results, 'results');
        next()
    })
    .catch(err => {
        console.log(err, 'error')
    })
    //can we thenable this into a next to send to middleware for the database/frontend?
    //next()
}

searchControllers.addFavorite = (res, req, next) => {

}

  //first req GET https://api.yelp.com/v3/businesses/search
  //what we need to get from this are the IDs from the query
  //zo is sending in 5 results
  //go into that result and pull out 5 ids
  //parse out res.body.business.id

//Client ID
//TGFWJiF1cChXSQp_usubUQ

//API Key
//FcwzVNzsVl_uQ2QdwZ5bkNZZp2d5zqBOB42D2SAzmtDgCLK0XxeClOD9F4aFyZcn58z0EjAKr8oRCKVje3z2hJwUHKbwUpOAYYoN_wAVYhinn0a0PN0YCX4txlCpYHYx


// yelp query picks up ids from the list of results:
// for loop to go through all the IDs
// list them out in the front end using the for loop
//

module.exports = searchControllers;