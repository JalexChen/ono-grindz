const express = require('express');
const searchControllers = require('../controllers/searchControllers');
const subscriptionController = require('../controllers/subscriptionController');
const router = express.Router();

router.use(express.json());
router.post('/search',
searchControllers.sendUserSearch,
searchControllers.sendID,
(req, res) => {
  const { details } = res.locals;
  return res.status(200).json({ details })
}
);

<<<<<<< HEAD
//this is what we save in db
router.post('/subscribe')

=======
// client will send a request to '/api/subscribe' after the user has selected their restaurants and clicked the subscribe button. The data received will be either in form of object or array of restaurant IDs
// this is what we save in db

// we will also need to schedule automatic emails to be sent out here for each restaurant using the NodeMailer and Cron node modules

router.use('/subscribe', 
  subscriptionController.getDetails,
  subscriptionController.scheduleEmails,
  (req, res) => {
    res.status(200).json('Subscribed!')
  }
)
>>>>>>> c8e3298819f350ed2894c20adbef5bb68d86f409
//will be sending the user all there subs
router.post('/')

//process client unsubscribe
router.delete('/unsubscribe')

module.exports = router;

