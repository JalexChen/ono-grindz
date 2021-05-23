const express = require('express');
const searchControllers = require('../controllers/searchControllers');
const router = express.Router();


router.get('/initialQuery',searchControllers.userSearch, (req, res, next) => res.json(placeholder));